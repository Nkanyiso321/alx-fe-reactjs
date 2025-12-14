import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Nested Routes',
      description: 'Profile section with nested routes for details and settings',
      path: '/profile',
      icon: '🔗',
    },
    {
      title: 'Dynamic Routing',
      description: 'View posts with dynamic URLs based on post ID',
      path: '/posts',
      icon: '🔄',
    },
    {
      title: 'Protected Routes',
      description: 'Authentication required for profile and dashboard',
      path: '/dashboard',
      icon: '🔒',
    },
    {
      title: 'Route Parameters',
      description: 'Dynamic user profiles with URL parameters',
      path: isAuthenticated ? `/user/${user?.id}` : '/login',
      icon: '👤',
    },
    {
      title: 'Admin Routes',
      description: 'Extra protection level for admin-only sections',
      path: '/admin',
      icon: '👑',
      admin: true,
    },
    {
      title: '404 Handling',
      description: 'Custom not found page for invalid routes',
      path: '/nonexistent',
      icon: '❓',
    },
  ];

  return (
    <div className="page home-page">
      <header className="page-header">
        <h1>React Router Demo</h1>
        <p className="subtitle">Complete routing implementation with all features</p>
      </header>

      {isAuthenticated ? (
        <div className="welcome-banner">
          <h2>Welcome back, {user?.name}!</h2>
          <p>You have access to all protected routes.</p>
          <div className="user-actions">
            <button onClick={() => navigate('/profile')} className="btn primary">
              Go to Profile
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn">
              Open Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="auth-prompt">
          <h2>Try Protected Routes</h2>
          <p>Login to access protected routes like Profile and Dashboard</p>
          <button onClick={() => navigate('/login')} className="btn primary">
            Login Now
          </button>
        </div>
      )}

      <section className="features-section">
        <h2>Router Features Demo</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.admin && !isAuthenticated ? (
                <div className="feature-status">
                  <span className="status-badge admin">Admin Only</span>
                </div>
              ) : (
                <Link to={feature.path} className="feature-link">
                  Try This Feature →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="instructions">
        <h2>Testing Instructions</h2>
        <div className="instructions-grid">
          <div className="instruction">
            <h3>1. Test Nested Routes</h3>
            <p>Navigate to Profile → Check sub-sections in nested routes</p>
          </div>
          <div className="instruction">
            <h3>2. Test Dynamic Routing</h3>
            <p>Click on any post → Observe URL with post ID parameter</p>
          </div>
          <div className="instruction">
            <h3>3. Test Protected Routes</h3>
            <p>Try accessing /dashboard without login → Should redirect to login</p>
          </div>
          <div className="instruction">
            <h3>4. Test 404 Handling</h3>
            <p>Visit /nonexistent → Should show custom 404 page</p>
          </div>
        </div>
      </section>

      <div className="route-info">
        <h3>Current Route Information</h3>
        <div className="info-box">
          <p><strong>Path:</strong> /home</p>
          <p><strong>Type:</strong> Public Route</p>
          <p><strong>Authentication:</strong> Not Required</p>
        </div>
      </div>
    </div>
  );
};

export default Home;