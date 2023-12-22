import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './loggedInViews.css';
import { useNavigate } from 'react-router-dom';

const GalaxyInvaders = () => {
  const [videos, setVideos] = useState([]);
  const [mouseX, setMouseX] = useState(0);
  const [beamPosition, setBeamPosition] = useState({ x: 0, y: 0, length: 0, angle: 0 });
  const [showBeam, setShowBeam] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 600;
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

    const handleMouseClick = (event: any) => {
      const spaceshipBottom = window.innerHeight - (isMobile ? 90 : 160); // Adjust bottom position for mobile
      const spaceshipCenterX = isMobile ? window.innerWidth / 2 : mouseX; // Center X-coordinate of the spaceship
      const dx = spaceshipCenterX - event.clientX ; // Horizontal difference
      const dy = spaceshipBottom - event.clientY; // Vertical difference
      const length = Math.sqrt(dx * dx + dy * dy); // Length of the beam
      const angle = Math.atan2(dy, dx) - Math.PI / 2; // Angle of the beam, rotated 90 degrees counter-clockwise
  
      setBeamPosition({ x: spaceshipCenterX, y: spaceshipBottom, length, angle });
      setShowBeam(true);
  
      // To hide the beam after some time
      setTimeout(() => setShowBeam(false), 100); // Adjust the timeout as needed
    };
  
  

  useEffect(() => {
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, [mouseX]);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMouseX(event.clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  let navigate = useNavigate();

  const handleWallerGPTClick = () => {
    handleMouseClick; // Trigger the laser beam

    // Delay the navigation
    setTimeout(() => {
      navigate('/wallergpt');
    }, 100);
  };

  const handleYouTubeClick = () => {
    handleMouseClick; // Trigger the laser beam

    // Delay the navigation
    setTimeout(() => {
      navigate('/youtube');
    }, 100);
  };

  const spaceshipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: isMobile ? '90px' : '10px', // Adjust bottom position for mobile
    left: isMobile ? '50%' : `${mouseX}px`, // Center the spaceship in mobile view
    transform: 'translateX(-50%)', // This will center the element when left is 50%
    pointerEvents: 'none',
    height: isMobile ? '90px' : '150px', // Smaller spaceship for mobile
  };
  
  

  const beamCommonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '160px',
    height: `${beamPosition.length}px`,
    transform: `rotateZ(${beamPosition.angle}rad)`,
    transformOrigin: 'bottom',
    display: showBeam ? 'block' : 'none',
  };
  
  const neonGreenBeamStyle: React.CSSProperties = {
    ...beamCommonStyle,
    backgroundColor: '#39FF14', // Neon green color
    width: '4px',
    left: `${beamPosition.x-2}px`, // Offset by half of the width
  };
  
  const whiteBeamStyle: React.CSSProperties = {
    ...beamCommonStyle,
    backgroundColor: 'white',
    width: '8px',
    left: `${beamPosition.x - 4}px`, // Offset by half of the width
  };
  
  
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage: 'url(/homepage.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    filter: 'blur(3px)',
    height: '100%',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    width: '100vw',
    paddingTop: '80px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'flex-start' : 'center',
    alignItems: isMobile ? 'center' : 'flex-start'
  };

  return (
    <div className='under-div' style={{ position: 'relative'}}>
      <div className='navbar-div'>
        <NavBar title="Galaxy Invaders"/>
      </div>
      <div style={backgroundImageStyle}></div>
      <div style={contentStyle}>
        <button className="glow-button" onClick={handleWallerGPTClick}>WallerGPT</button>
        <button className="glow-button" style={{marginLeft: isMobile ? '0px' : '100px', marginTop: isMobile ? '20px' : '0px',}} onClick={handleYouTubeClick}>YouTube</button>
      </div>
      <div style={whiteBeamStyle}></div> 
      <div style={neonGreenBeamStyle}></div> 

      <img src="/pngegg.png" style={spaceshipStyle} alt="Spaceship" />
    </div>
  );
};

export default GalaxyInvaders;