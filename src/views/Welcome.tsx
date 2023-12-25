import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './loggedInViews.css';

const Welcome = () => {
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 80);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 600;

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight - 80);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const pageStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center", // Changed to center
        height: "fit-content",
        width: isMobile ? "90%" : "50%",
        paddingTop: '25px',
        paddingLeft: '10px',
        paddingRight: '10px',
        color: '#FFFFFF', // Assuming white text for readability
        textAlign: 'center',
        overflowY: 'scroll', // Always scrollable
        borderRadius: '8px',
        border: '2px solid #272831',
        backgroundColor: '#606178',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: isMobile ? '1.7em' : '4.0em', // Smaller font size on mobile
        textAlign: 'center', // Centered title
        width: '100%', // Full width
        
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'auto', paddingBottom: '25px'}}>
        <div className="moving-background"></div> {/* Separate div for moving background */}
        <div className='navbar-div'>
            <NavBar title="Wally's World"/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: '80px', overflow: 'scroll'}}>
            <h1 style={titleStyle}>Welcome to Wally's World</h1>
            <div style={pageStyle}>
                    
                    <p>Welcome! My name is <span style={{color: '#22bcf3', fontSize: '1.4em'}}>Evan Waller</span> and this is my resume website. If you have any questions, feel free to ask <Link className='hover-underline' style={{ color: '#22bcf3', fontWeight: 'bold', fontSize: '1.3em', textDecoration: isMobile ? 'underline': '', display: 'inline'}} to="/wallergpt"> WallerGPT: my openAI fine-tuned chatbot</Link>. Happy exploring!</p>
                    <Link className='hover-underline' style={{marginTop: '50px', marginBottom: '15px'}} to="/resume"><strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>📄 Resume:</strong> Education & Professional Work Experience</Link>
                    <Link className='hover-underline' style={{marginBottom: '15px'}} to="/mycode"><strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>💻 My Code:</strong> What I Have Built</Link>
                    <Link className='hover-underline' style={{marginBottom: '15px',}} to="/wallergpt"><strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>🤖 WallerGPT:</strong> My AI Clone (In Progress)</Link>
                    <Link className='hover-underline' style={{marginBottom: '15px'}}to="/youtube"><strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>🚀 Anding Analytics - YouTube:</strong> My YouTube Channel</Link>
                    {/* <Link className='hover-underline' style={{marginTop: '15px'}} to="/galaxyinvaders">🕹️ <strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>Galaxy Invaders:</strong> A Tribute To My First Python Creation</Link> */}
                    {/* <Link className='hover-underline' style={{marginBottom: '50px',}} to="/interests"><strong style={{fontSize: isMobile ? '1.1em' : '1.8em', textDecoration: isMobile ? 'underline': ''}}>🌌 Interests:</strong> What I Do For Fun</Link> */}
                    
                    
                    <p style={{fontSize:'13px'}}>Disclaimer: The website will forever be a work in progress. Contact me if you have any cool ideas or would like to report a bug. Email: evanwaller03@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
