import React, { useState } from 'react';
import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pages.css';

// Sub-components for nested routes
const ProfileDetails = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'No bio added yet.',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Profile Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn small"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-input"
              rows="4"
            />
          </div>
          <button type="submit" className="btn primary">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="profile-header">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="profile-avatar-large"
            />
            <div className="profile-meta">
              <h3>{user?.name}</h3>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-role">
                Role: <span className="role-badge">{user?.role}</span>
              </p>
            </div>
          </div>
          <div className="profile-bio">
            <h4>About Me</h4>
            <p>{user?.bio || 'No bio added yet.'}</p>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">12</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">48</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-value">156</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    language: 'en',
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const handleSelect = (e) => {
    setSettings({
      ...settings,
      language: e.target.value,
    });
  };

  return (
    <div className="profile-section">
      <h2>Account Settings</h2>
      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive email notifications for important updates</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Weekly Updates</h4>
            <p>Get weekly email summaries</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Dark Mode</h4>
            <p>Enable dark theme</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Language</h4>
            <p>Select your preferred language</p>
          </div>
          <select
            value={settings.language}
            onChange={handleSelect}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn primary">Save Settings</button>
        <button className="btn secondary">Reset to Default</button>
      </div>
    </div>
  );
};

const ProfileActivity = () => {
  const activities = [
    { id: 1, action: 'Posted a new article', time: '2 hours ago' },
    { id: 2, action: 'Commented on "React Best Practices"', time: '1 day ago' },
    { id: 3, action: 'Updated profile picture', time: '2 days ago' },
    { id: 4, action: 'Followed new user', time: '3 days ago' },
  ];

  return (
    <div className="profile-section">
      <h2>Recent Activity</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p>{activity.action}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Profile Component with Nested Routes
const Profile = ({ isViewOnly = false }) => {
  const { user } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const isExternalProfile = !!userId && userId !== user?.id.toString();

  const profileTabs = [
    { id: 'details', label: 'Details', path: '' },
    { id: 'activity', label: 'Activity', path: 'activity' },
    ...(isViewOnly ? [] : [{ id: 'settings', label: 'Settings', path: 'settings' }]),
  ];

  return (
    <div className="page profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="cover-content">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="profile-avatar-main"
            />
            <div className="profile-title">
              <h1>{isExternalProfile ? `User ${userId}` : user?.name}</h1>
              <p className="profile-subtitle">
                {isExternalProfile 
                  ? 'External User Profile' 
                  : user?.email}
                {isExternalProfile && (
                  <span className="view-only-badge">View Only</span>
                )}
              </p>
            </div>
          </div>
          {!isViewOnly && (
            <button
              onClick={() => navigate('/')}
              className="back-btn"
            >
              ← Back to Home
            </button>
          )}
        </div>

        <nav className="profile-tabs">
          {profileTabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              end={tab.path === ''}
              className={({ isActive }) =>
                `profile-tab ${isActive ? 'active' : ''}`
              }
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="profile-content">
        {/* Nested Routes Outlet */}
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="activity" element={<ProfileActivity />} />
        </Routes>
        <Outlet />
      </div>

      {isExternalProfile && (
        <div className="external-profile-note">
          <h3>🔍 External Profile View</h3>
          <p>
            You're viewing another user's profile. This demonstrates dynamic routing 
            with URL parameters. Your user ID in the URL is: <code>{userId}</code>
          </p>
          <Link to="/profile" className="btn">
            ← View My Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;