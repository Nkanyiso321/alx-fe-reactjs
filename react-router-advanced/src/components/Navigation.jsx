import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/posts', label: 'Posts' },
  ];

  const authLinks = isAuthenticated
    ? [
        { to: '/profile', label: 'Profile' },
        { to: '/dashboard', label: 'Dashboard' },
        ...(isAdmin ? [{ to: '/admin', label: 'Admin', isAdmin: true }] : []),
      ]
    : [{ to: '/login', label: 'Login' }];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <NavLink to="/" className="logo-link">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">RouterDemo</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {/* Main Navigation */}
          <div className="nav-section">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Authentication Links */}
          <div className="nav-section auth-section">
            {authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link auth-link ${isActive ? 'active' : ''} ${
                    link.isAdmin ? 'admin-link' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                {link.isAdmin && <span className="admin-badge">ADMIN</span>}
              </NavLink>
            ))}

            {isAuthenticated && (
              <div className="user-section">
                <div className="user-info">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="user-avatar"
                  />
                  <span className="user-name">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Current Route Indicator */}
        <div className="current-route">
          <span className="route-label">Current:</span>
          <span className="route-path">{location.pathname}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;