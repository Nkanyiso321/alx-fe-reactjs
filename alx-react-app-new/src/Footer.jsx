cat > Footer.jsx << 'EOF'
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#222',
      color: 'white',
      textAlign: 'center',
      padding: '1rem',
      marginTop: '2rem',
      fontSize: '0.9rem'
    }}>
      <p>&copy; {new Date().getFullYear()} My Favorite Cities App</p>
    </footer>
  );
}

export default Footer;
EOF
