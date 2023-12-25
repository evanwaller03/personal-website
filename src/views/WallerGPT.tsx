import React from 'react';
import NavBar from '../components/NavBar';
import ChatInterface from '../components/ChatInterface';
import './loggedInViews.css'

const WallerGPT = () => {
    const pageStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%", // This makes the inner container take up 100% of the parent's height
        width: "100%",
        paddingTop: '80px'
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh',  overflow: 'hidden' }}>
            <div className="moving-background"></div> 
            <div className='navbar-div'>
                <NavBar title='WallerGPT'/>
            </div>
            <div style={pageStyle}>
                <ChatInterface/>
            </div>
        </div>
    );
};

export default WallerGPT;
