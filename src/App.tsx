import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import PhoneBackground from '/phone-background.png';
import BestLogo from '/best-logo.png';

function App() {
  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if the window is mobile size
  const isMobile = windowWidth < 600;

  const backgroundImageStyle: React.CSSProperties  = {
    backgroundImage: `url(${isMobile ? PhoneBackground : BestLogo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };

  const hoverMessage: React.CSSProperties  = {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={hoverMessage}>
        <Message />
      </div>
    </div>
  );
}

export default App;
