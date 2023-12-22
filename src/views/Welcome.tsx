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
        width: isMobile ? "90%" : "65%",
        paddingTop: '25px',
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
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#343541'}}>
            <div className='navbar-div'>
                <NavBar title="Wally's World"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
                <h1 style={titleStyle}>Welcome to Wally's World</h1>
                <div style={pageStyle}>
                    
                    <p>Welcome! Explore my blend of coding projects and personal interests. If you have any questions, feel free to ask <Link style={{ fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline', display: 'inline'}} to="/wallergpt"> WallerGPT: my openAI fine-tuned chatbot</Link>. Happy exploring!</p>
                    
                    <Link className='hover-underline' style={{marginTop: '50px'}}to="/youtube">🚀 <strong style={{fontSize: isMobile ? '1.1em' : '1.4em'}}>YouTube Channel - Anding Analytics:</strong> My YouTube Channel</Link>
                    <Link className='hover-underline' style={{marginTop: '15px'}} to="/galaxyinvaders">🕹️ <strong style={{fontSize: isMobile ? '1.1em' : '1.4em'}}>Galaxy Invaders:</strong> A Tribute To My First Python Creation</Link>
                    <Link className='hover-underline' style={{marginTop: '15px'}} to="/resume">📄 <strong style={{fontSize: isMobile ? '1.1em' : '1.4em'}}>Professional Resume:</strong> Education & Professional Work Experience</Link>
                    <Link className='hover-underline' style={{marginTop: '15px', marginBottom: '15px'}} to="/interests">🌌 <strong style={{fontSize: isMobile ? '1.1em' : '1.4em'}}>Interests:</strong> My Hobbies & Interests</Link>
                    <Link className='hover-underline' style={{marginBottom: '50px'}} to="/mycode">💻 <strong style={{fontSize: isMobile ? '1.1em' : '1.4em'}}>My Code:</strong> What I Have Built</Link>
                    
                    <p>Disclaimer: I am still learning. Contact me if you have any cool ideas or would like to report a bug. Email: evanwaller03@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
