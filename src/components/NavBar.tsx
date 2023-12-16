import React from 'react';
import Logo from '../../public/w-logo-square.png';

const NavBar = () => {

    const circleStyle: React.CSSProperties = {
        width: '60px', // Use vmin for responsive circle size
        height: '60px', // Same as width to maintain the circle shape
        borderRadius: '50%', // Creates a circle
        backgroundImage: `url(${Logo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 25px 10px 25px', width: "100vw" }}>
      <div style={circleStyle}></div>
      <h2>Wally's World</h2>
      <button>Menu</button>
    </div>
  );
};

export default NavBar;
