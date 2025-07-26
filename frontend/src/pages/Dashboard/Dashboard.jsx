import { Link } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth(); // Get user from AuthContext


  const recentEvaluations = [
    {
      type: 'OMR',
      date: 'Today, 10:30 AM',
      score: '85/100',
      details: 'Soft Skil Exam'
    },
    {
      type: 'Text',
      date: 'Yesterday, 2:15 PM',
      score: '72/100',
      details: 'English Exam'
    }
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome{user?.name ? `, ${user.name}` : ''}!</h1>
      <p className="dashboard-subtitle">
        {user?.email ? `Logged in as ${user.email}` : 'Choose an evaluation method to get started'}
      </p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">
            <i className="fas fa-poll"></i> 
          </div>
          <h2>OMR Evaluation</h2>
          <p>Upload and evaluate OMR answer sheets automatically with our AI-powered system</p>
          <Link to="/upload-omr" className="dashboard-card-btn">
            Evaluate OMR Sheets
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <i className="fas fa-edit"></i> {/* Font Awesome icon for Text */}
          </div>
          <h2>Text Evaluation</h2>
          <p>Evaluate handwritten or typed answers with detailed feedback and scoring</p>
          <Link to="/text-evaluation" className="dashboard-card-btn">
            Evaluate Text Answers
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h3>Recent Evaluations</h3>
          <Link to="/history" className="view-all">View All</Link>
        </div>
        
        {recentEvaluations.length > 0 ? (
          <div className="activity-list">
            {recentEvaluations.map((evaluation, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-main">
                  <span className={`activity-type ${evaluation.type.toLowerCase()}`}>
                    {evaluation.type}
                  </span>
                  <span className="activity-details">{evaluation.details}</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-date">{evaluation.date}</span>
                  <span className="activity-score">{evaluation.score}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-activity">
            <p>No recent evaluations found</p>
            <Link to="/upload-omr" className="start-evaluating">
              Start Evaluating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;