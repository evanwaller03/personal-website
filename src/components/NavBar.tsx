import React, { useState, CSSProperties } from 'react';
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
   
  const circleStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const dropDownMenu: CSSProperties = {
    position: 'relative', // Create a positioning context
    minHeight: '50px', // Fill the height of the navbar'
    width:'50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
    backgroundColor: '#343541',
    margin: '10px 10px 10px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '',
  };

  const dropdownContent: CSSProperties = {
    display: isDropdownOpen ? 'block' : 'none', // Only display when isDropdownOpen is true
    position: 'absolute',
    backgroundColor: '#343541',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.4)',
    padding: '12px 16px',
    borderRadius: '7px',
    zIndex: 20000,
    right: 0, // Adjust this as needed
    top: '80px', // Position below the navbar
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // Close the dropdown after navigation
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '60px', alignItems: 'center', padding: '10px 10px', width: "100vw", backgroundColor: 'rgba(0,0,0,1)' }}>
      <div style={circleStyle}></div>
      <h2>{title}</h2>
      <div style={dropDownMenu} onClick={toggleDropdown}>
        <HiMenu style={{fontSize: '30'}}/>
        <div style={dropdownContent}>
          {/* Add navigation items here */}
          <div onClick={() => handleNavigation('/home')}>Home</div>
          <div onClick={() => handleNavigation('/youtube')}>YouTube</div>
          <div onClick={() => handleNavigation('/chatbot')}>WallerGPT</div>
          {/* Add more navigation items as needed */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;