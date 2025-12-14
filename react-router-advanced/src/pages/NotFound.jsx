import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Pages.css';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const commonRoutes = ['/', '/about', '/posts', '/login', '/profile', '/dashboard'];
  const suggestions = commonRoutes.filter(route => route !== location.pathname);

  return (
    <div className="page not-found-page">
      <div className="not-found-container">
        <div className="error-code">
          <span className="code-number">4</span>
          <span className="code-icon">🔄</span>
          <span className="code-number">4</span>
        </div>
        
        <h1>Page Not Found</h1>
        <p className="error-message">
          The page <code>{location.pathname}</code> doesn't exist.
        </p>

        <div className="error-details">
          <div className="detail-box">
            <h3>💡 What happened?</h3>
            <p>
              You tried to access a route that doesn't exist in our application.
              This is a 404 error page, which is properly handled by React Router.
            </p>
          </div>
          <div className="detail-box">
            <h3>🔧 How it works?</h3>
            <p>
              The <code>&lt;Route path="*"&gt;</code> catches all undefined routes
              and displays this custom 404 page.
            </p>
          </div>
        </div>

        <div className="suggestions">
          <h3>Try these valid routes instead:</h3>
          <div className="suggestion-links">
            {suggestions.slice(0, 5).map((route, index) => (
              <Link key={index} to={route} className="suggestion-link">
                {route === '/' ? 'Home' : route}
              </Link>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="btn">
            ← Go Back
          </button>
          <button onClick={() => navigate('/')} className="btn primary">
            Go to Home
          </button>
          <button onClick={() => window.location.reload()} className="btn secondary">
            Refresh Page
          </button>
        </div>

        <div className="router-demo">
          <h3>404 Handling in React Router</h3>
          <div className="demo-code">
            <pre>
{`// In App.jsx:
<Routes>
  {/* ... other routes ... */}
  <Route path="*" element={<NotFound />} />
</Routes>`}
            </pre>
          </div>
          <p>
            The <code>*</code> path acts as a catch-all for any undefined routes.
          </p>
        </div>

        <div className="test-404">
          <h3>Test Invalid Routes:</h3>
          <p>Try accessing these non-existent routes:</p>
          <div className="test-links">
            <Link to="/invalid-route" className="test-link">
              /invalid-route
            </Link>
            <Link to="/something/that/doesnt/exist" className="test-link">
              /something/that/doesnt/exist
            </Link>
            <Link to="/123/456/789" className="test-link">
              /123/456/789
            </Link>
          </div>
          <p className="test-note">
            All should show this 404 page, demonstrating proper error handling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;