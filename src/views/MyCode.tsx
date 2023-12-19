import React from 'react';
import NavBar from '../components/NavBar';
import ChatInterface from '../components/ChatInterface';

const MyCode = () => {
    const pageStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%", // This makes the inner container take up 100% of the parent's height
        width: "100%",
        paddingTop: '25px'
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#343541', overflow: 'hidden' }}>
            <div className='navbar-div'>
                <NavBar title='My Code'/>
            </div>
            <div style={pageStyle}>
                
            </div>
        </div>
    );
};

export default MyCode;
