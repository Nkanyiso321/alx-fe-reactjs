import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Navigation happens automatically due to the useEffect above
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (type) => {
    setEmail(type === 'admin' ? 'admin@example.com' : 'user@example.com');
    setPassword('password');
    
    // Auto-submit after a short delay
    setTimeout(async () => {
      try {
        await login(
          type === 'admin' ? 'admin@example.com' : 'user@example.com',
          'password'
        );
      } catch (err) {
        setError(err.message);
      }
    }, 100);
  };

  return (
    <div className="page login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <p className="subtitle">
            {from !== '/' ? (
              <>You need to login to access <code>{from}</code></>
            ) : (
              'Login to access protected routes'
            )}
          </p>
        </div>

        <div className="demo-accounts">
          <h3>Try Demo Accounts:</h3>
          <div className="demo-buttons">
            <button
              onClick={() => handleDemoLogin('user')}
              className="demo-btn user"
              disabled={isLoading}
            >
              👤 Regular User
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="demo-btn admin"
              disabled={isLoading}
            >
              👑 Admin User
            </button>
          </div>
          <p className="demo-note">
            Both use password: <code>password</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-info">
          <h3>Protected Routes Demo</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🔒</div>
              <div className="info-content">
                <h4>Route Protection</h4>
                <p>Unauthenticated users get redirected here</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📋</div>
              <div className="info-content">
                <h4>State Preservation</h4>
                <p>Original destination is saved for redirect after login</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">👑</div>
              <div className="info-content">
                <h4>Role-based Access</h4>
                <p>Admin users get access to additional routes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="test-routes">
          <h3>Test These After Login:</h3>
          <div className="route-links">
            <Link to="/profile" className="route-link">
              /profile (Protected)
            </Link>
            <Link to="/dashboard" className="route-link">
              /dashboard (Protected)
            </Link>
            <Link to="/admin" className="route-link">
              /admin (Admin Only)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;