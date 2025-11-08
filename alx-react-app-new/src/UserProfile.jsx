cat > UserProfile.jsx << 'EOF'
import React from 'react';

function UserProfile({ name, age, bio }) {
  return (
    <div style={{
      border: '2px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      margin: '20px auto',
      backgroundColor: '#f9f9f9',
      maxWidth: '400px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: 'blue', marginTop: 0 }}>{name}</h2>
      <p><strong>Age:</strong> <span style={{ fontWeight: 'bold' }}>{age}</span></p>
      <p><strong>Bio:</strong> {bio}</p>
    </div>
  );
}

export default UserProfile;
EOF
