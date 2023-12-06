import React, { useState, useEffect, } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Message from '../components/Message';
import PhoneBackground from '/phone-background.png';
import BestLogo from '/best-logo.png';

function Home() {
    let navigate = useNavigate();
  const handleSecretClick = () => {
    navigate('/chatbot');
  };
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
            <Message onSecretClick={handleSecretClick}/>
          </div>
        </div>
    )
}

export default Home;