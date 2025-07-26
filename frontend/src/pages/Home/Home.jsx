import { useState } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import './Home.css';

const Home = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="home-content">
      <div className="hero-section">
        <div className="hero-content">
          <div className="project-info">
            <h1>AI Based Exam Evaluator</h1>
            <p className="subtitle">
              Revolutionizing education with artificial intelligence powered evaluation system.
              Get instant, accurate results for your examinations.
            </p>
            <div className="features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Instant Results</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>99% Accuracy</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>

          <div className="auth-container">
            <AuthForm isLogin={isLoginForm} />
            <p className="toggle-form-text">
              {isLoginForm ? "Don't have an account? " : "Already have an account? "}
              <button type="button" className="toggle-form-btn" onClick={toggleForm}>
                {isLoginForm ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;