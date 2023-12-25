import React, { useState, CSSProperties, useEffect } from 'react';
import Logo from '../../public/w-logo-square.png';
import { HiMenu } from "react-icons/hi";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ title } : any) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Handler to close the dropdown if the click is outside
    const closeDropdown = (event: any) => {
      const dropdownMenuElement = document.getElementById('dropdownMenuElement');
      const dropdownButtonElement = document.getElementById('dropdownButtonElement');
  
      // Check if the click was outside of these elements
      if (dropdownMenuElement && !dropdownMenuElement.contains(event.target) &&
          dropdownButtonElement && !dropdownButtonElement.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
  
    // Add event listener for clicks
    document.addEventListener('click', closeDropdown);
  
    // Remove event listener on cleanup
    return () => document.removeEventListener('click', closeDropdown);
  }, [isDropdownOpen]); // Only re-run if isDropdownOpen changes
   
  const circleStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: "pointer"
  };

  const dropDownMenu: CSSProperties = {
    position: 'relative', // Create a positioning context
    minHeight: '50px', // Fill the height of the navbar'
    width:'50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
    backgroundColor: '#606178',
    margin: '10px 10px 10px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    
  };

  const dropdownContent: CSSProperties = {
    display: isDropdownOpen ? 'block' : 'none', // Only display when isDropdownOpen is true
    position: 'absolute',
    backgroundColor: '#343541',
    minWidth: '160px',
    boxShadow: '0 0 10px white',
    padding: '12px 16px',
    borderRadius: '7px',
    zIndex: 20000,
    border: '2px solid white',
    right: 0, // Adjust this as needed
    top: '80px', // Position below the navbar
  };

  const dropDownItem: CSSProperties = {
    fontSize: '1.1em',
    marginBottom: '7px',
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // Close the dropdown after navigation
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '60px', alignItems: 'center', padding: '10px 10px', width: "100vw", backgroundColor: '#343541' }}>
      <div style={circleStyle}
          onClick={navigateHome}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '2px solid white';
            e.currentTarget.style.boxShadow = '0 0 10px white';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.border = '2px solid #272831';
            e.currentTarget.style.boxShadow = 'none';
        }}
          />
      <h2>{title}</h2>
      <div style={dropDownMenu}
          onClick={toggleDropdown}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '2px solid white';
            e.currentTarget.style.boxShadow = '0 0 10px white';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.border = '2px solid #272831';
            e.currentTarget.style.boxShadow = 'none';
        }} 
        id="dropdownButtonElement">
        <HiMenu style={{fontSize: '30'}}/>
        <div style={dropdownContent} id="dropdownButtonElement" >
          {/* Add navigation items here */}
          <div style={dropDownItem} onClick={() => handleNavigation('/')}>Welcome</div>
          <div style={dropDownItem} onClick={() => handleNavigation('/resume')}>Resume</div>
          <div style={dropDownItem} onClick={() => handleNavigation('/mycode')}>My Code</div>
          <div style={dropDownItem} onClick={() => handleNavigation('/youtube')}>YouTube</div>
          {/* <div onClick={() => handleNavigation('/galaxyinvaders')}>Galaxy Invaders</div> */}
          <div style={dropDownItem} onClick={() => handleNavigation('/wallergpt')}>WallerGPT</div>
          {/* <div onClick={() => handleNavigation('/quotes')}>Quotes</div> */}
          {/* <div onClick={() => handleNavigation('/interests')}>Interests</div> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;