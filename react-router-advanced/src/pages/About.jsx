import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const About = () => {
  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', bio: 'Specializes in React and modern JavaScript.' },
    { id: 2, name: 'Bob Smith', role: 'Backend Developer', bio: 'Focuses on API development and databases.' },
    { id: 3, name: 'Carol Davis', role: 'UI/UX Designer', bio: 'Creates beautiful and functional user interfaces.' },
  ];

  return (
    <div className="page about-page">
      <header className="page-header">
        <h1>About This Demo</h1>
        <p className="subtitle">A comprehensive React Router implementation</p>
      </header>

      <section className="content-section">
        <h2>Project Overview</h2>
        <p>
          This application demonstrates advanced React Router features including nested routes,
          dynamic routing, protected routes, and proper error handling. The goal is to showcase
          a production-ready routing setup.
        </p>
      </section>

      <section className="features-list">
        <h2>Implemented Features</h2>
        <ul>
          <li>
            <strong>Nested Routes:</strong> Profile section with sub-routes for details and settings
          </li>
          <li>
            <strong>Dynamic Routing:</strong> Posts and user profiles with URL parameters
          </li>
          <li>
            <strong>Protected Routes:</strong> Authentication-required routes with redirects
          </li>
          <li>
            <strong>Route Guards:</strong> Admin-only routes with additional protection
          </li>
          <li>
            <strong>404 Handling:</strong> Custom not-found page for invalid routes
          </li>
          <li>
            <strong>Navigation:</strong> Responsive navbar with active state indicators
          </li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Team Members</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">
                {member.name.charAt(0)}
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
              <Link to={`/user/${member.id}`} className="view-profile-link">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="navigation-tips">
        <h3>Try These Routes:</h3>
        <div className="route-links">
          <Link to="/posts/1" className="route-link">
            Dynamic Post Route
          </Link>
          <Link to="/profile/details" className="route-link">
            Nested Profile Route
          </Link>
          <Link to="/dashboard" className="route-link">
            Protected Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;