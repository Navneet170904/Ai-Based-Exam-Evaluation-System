import { useState } from "react";
import { textEvaluationService } from "../../services/api";
import "./TextEvaluation.css";

const TextEvaluation = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !question) {
      setError("Please provide both an image and a question");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("question", question);

      // Initial request to start processing
      const startResponse = await fetch(
        "http://localhost:5000/api/evaluate-text",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!startResponse.ok) {
        const errorData = await startResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to start evaluation");
      }

      const startData = await startResponse.json();
      const processingId = startData.processing_id;

      // Poll for results
      const pollInterval = 2000; // 2 seconds
      const maxAttempts = 30; // 1 minute total
      let attempts = 0;

      const checkStatus = async () => {
        attempts++;
        const statusResponse = await fetch(
          `http://localhost:5000/api/check-status/${processingId}`,
          {
            credentials: "include",
          }
        );

        if (statusResponse.status === 202) {
          // Still processing
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
            return checkStatus();
          } else {
            throw new Error(
              "Evaluation took too long. Please try again later."
            );
          }
        } else if (statusResponse.ok) {
          // Processing complete
          return statusResponse.json();
        } else {
          // Error occurred
          const errorData = await statusResponse.json().catch(() => ({}));
          throw new Error(errorData.message || "Evaluation failed");
        }
      };

      const result = await checkStatus();
      console.log(result);
      setResult(result);
    } catch (err) {
      setError(err.message || "Failed to evaluate text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-evaluation-container">
      <h2>Text Answer Evaluation</h2>
      <p className="subtitle">
        Upload an image of handwritten or typed answers for AI evaluation
      </p>

      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question that was asked"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer-image">Answer Image:</label>
          <div className="file-upload">
            <input
              type="file"
              id="answer-image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            <label htmlFor="answer-image" className="file-upload-label">
              {file ? file.name : "Choose an image file"}
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Evaluating..." : "Evaluate Answer"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-container">
          <h3>Evaluation Results</h3>

          <div className="result-section">
            <h4>Extracted Answer:</h4>
            <div className="answer-box">
              <p>{result.prediction_text}</p>
            </div>
          </div>

          <div className="result-section evaluation-section">
            <div className="score-box">
              <h4>Score:</h4>
              <div className="score-circle">
                {result.evaluation?.score || 0}
                <span>/10</span>
              </div>
            </div>

            <div className="feedback-grid">
              {result.evaluation?.strengths?.length > 0 && (
                <div className="feedback-card strengths">
                  <h5>✅ Strengths</h5>
                  <ul>
                    {result.evaluation.strengths.map((item, i) => (
                      <li key={`strength-${i}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.evaluation?.improvements?.length > 0 && (
                <div className="feedback-card improvements">
                  <h5>📝 Areas for Improvement</h5>
                  <ul>
                    {result.evaluation.improvements.map((item, i) => (
                      <li key={`improvement-${i}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.evaluation?.feedback && (
                <div className="feedback-card detailed-feedback">
                  <h5>📌 Detailed Feedback</h5>
                  <p>{result.evaluation.feedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEvaluation;
