import { useState } from 'react';
import { omrService } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './OMRUpload.css';

const OMRUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [answerKey, setAnswerKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !answerKey) {
      setError('Please select a file and provide an answer key');
      return;
    }
  
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await omrService.uploadOMR(file, answerKey);
      
      if (response.success) {
        setResult({
          roll_number: response.roll_number || 'N/A',
          detected_answers: response.detected_answers || [],
          total_marks: response.total_marks || '0',
          wrong_answers: response.wrong_answers || 0
        });
      } else {
        setError(response.message || 'Failed to process OMR sheet');
      }
    } catch (err) {
      console.error('Detailed error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to process OMR sheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="omr-upload-container">
      <h2>Upload OMR Sheet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>OMR Sheet Image</label>
          <div className="file-input-wrapper">
            <label className="file-input-label">
              <FontAwesomeIcon icon={faCloudUploadAlt} />
              <span className="file-input-text">
                {fileName ? fileName : 'Choose file...'}
              </span>
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*,.pdf" 
                required 
              />
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Correct Answer Key (e.g., "a,b,c,d,a,b...")</label>
          <input
            type="text"
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
            placeholder="Enter comma-separated correct answers"
            required
          />
          <small>Enter answers separated by commas (no spaces)</small>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              <span>Processing...</span>
            </>
          ) : (
            'Evaluate OMR'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="result-container">
          <h3>Evaluation Results</h3>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Roll Number:</span>
              <span className="result-value">{result.roll_number}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Detected Answers:</span>
              <span className="result-value answers">
                {Array.isArray(result.detected_answers) 
                  ? result.detected_answers.join(', ') 
                  : 'N/A'}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Score:</span>
              <span className="result-value score">
                {result.total_marks}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Wrong Answers:</span>
              <span className="result-value wrong">
                {result.wrong_answers > 0 ? result.wrong_answers : 'None'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OMRUpload;