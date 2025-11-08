cat > App.jsx << 'EOF'
import React from 'react';
import Header from './Header';
import UserProfile from './UserProfile';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="N. Dube" age={30} bio="React developer & traveler" />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
EOF
