import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import './Navbar.css';

const Layout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { 
        state: { from: location.pathname },
        replace: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">AI Evaluator</Link>
          </div>
          
          {isAuthenticated ? (
            <ul className="nav-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/upload-omr">OMR Evaluation</Link></li>
              <li><Link to="/text-evaluation">Text Evaluation</Link></li>
              <li className="user-info">
                <span>Welcome, {user?.name || 'User'}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li><Link to="/login" state={{ from: location.pathname }}>Login</Link></li>
              <li><Link to="/register" state={{ from: location.pathname }}>Register</Link></li>
            </ul>
          )}
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} AI Evaluator System</p>
      </footer>
    </div>
  );
};

export default Layout;