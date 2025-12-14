import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  const stats = [
    { label: 'Total Posts', value: '128', change: '+12%', icon: '📝' },
    { label: 'Comments', value: '1,245', change: '+8%', icon: '💬' },
    { label: 'Users', value: '543', change: '+5%', icon: '👥' },
    { label: 'Page Views', value: '24.5K', change: '+15%', icon: '👁️' },
  ];

  const recentActivities = [
    { user: 'Alice Johnson', action: 'created new post', time: '10 min ago' },
    { user: 'Bob Smith', action: 'commented on your post', time: '30 min ago' },
    { user: 'Carol Davis', action: 'updated profile', time: '2 hours ago' },
    { user: 'David Wilson', action: 'joined the platform', time: '5 hours ago' },
  ];

  const adminFeatures = [
    { title: 'User Management', description: 'Manage all users and permissions', path: '/admin/users' },
    { title: 'System Settings', description: 'Configure platform settings', path: '/admin/settings' },
    { title: 'Analytics', description: 'View detailed analytics reports', path: '/admin/analytics' },
    { title: 'Content Moderation', description: 'Moderate posts and comments', path: '/admin/moderation' },
  ];

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Dashboard</h1>
          <p className="welcome-message">
            Welcome back, <strong>{user?.name}</strong>! 
            {isAdmin && <span className="admin-badge-large">👑 ADMIN</span>}
          </p>
        </div>
        <div className="dashboard-actions">
          <Link to="/profile" className="btn">
            View Profile
          </Link>
          <Link to="/posts" className="btn primary">
            View Posts
          </Link>
        </div>
      </header>

      <div className="route-info-banner">
        <div className="route-info-content">
          <h3>🔐 Protected Route</h3>
          <p>
            This dashboard is protected and requires authentication. 
            Only logged-in users can see this page.
          </p>
        </div>
        <div className="route-details">
          <p><strong>Access Level:</strong> {isAdmin ? 'Administrator' : 'Regular User'}</p>
          <p><strong>Authentication:</strong> Required</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-avatar">
                  {activity.user.charAt(0)}
                </div>
                <div className="activity-details">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <Link to="/posts/1" className="quick-link">
              <span className="link-icon">📄</span>
              <span className="link-text">Featured Post</span>
            </Link>
            <Link to="/profile/settings" className="quick-link">
              <span className="link-icon">⚙️</span>
              <span className="link-text">Settings</span>
            </Link>
            <Link to="/about" className="quick-link">
              <span className="link-icon">ℹ️</span>
              <span className="link-text">About</span>
            </Link>
            <Link to="/user/123" className="quick-link">
              <span className="link-icon">👤</span>
              <span className="link-text">Sample Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="admin-section">
          <h2>👑 Admin Features</h2>
          <p className="admin-note">
            These features are only visible to administrators
          </p>
          <div className="admin-features">
            {adminFeatures.map((feature, index) => (
              <div key={index} className="admin-feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.path} className="admin-feature-link">
                  Access →
                </Link>
              </div>
            ))}
          </div>
          <div className="admin-test">
            <h3>Test Admin Protection:</h3>
            <p>
              Log out and try accessing <code>/admin</code> directly. 
              You'll be redirected to login.
            </p>
            <p>
              Login as regular user and try <code>/admin</code> - 
              you'll see "Access Denied".
            </p>
          </div>
        </div>
      )}

      <div className="protected-route-demo">
        <h3>Protected Route Testing</h3>
        <div className="test-cases">
          <div className="test-case">
            <h4>🔍 Test 1: Direct Access</h4>
            <p>Try accessing /dashboard directly without login</p>
            <code>Result: Redirects to /login</code>
          </div>
          <div className="test-case">
            <h4>🔄 Test 2: Login/Logout</h4>
            <p>Login → Access dashboard → Logout → Try dashboard again</p>
            <code>Result: Loses access after logout</code>
          </div>
          <div className="test-case">
            <h4>📋 Test 3: URL Sharing</h4>
            <p>Share dashboard URL with someone not logged in</p>
            <code>Result: They get redirected to login</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;