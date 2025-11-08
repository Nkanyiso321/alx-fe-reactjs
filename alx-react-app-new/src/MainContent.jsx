cat > MainContent.jsx << 'EOF'
import React from 'react';

function MainContent() {
  const cities = ['New York', 'Paris', 'Tokyo', 'London', 'Cape Town'];

  return (
    <main style={{
      padding: '30px',
      backgroundColor: '#f0f0f0',
      minHeight: '50vh'
    }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Explore Cities</h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center'
      }}>
        {cities.map(city => (
          <li key={city} style={{
            background: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            flex: '1 1 120px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {city}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MainContent;
EOF
