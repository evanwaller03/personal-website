import React from 'react';
import CountdownTimer from './CountdownTimer';

function Message() {
  const messageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center",     // Vertical centering
    height: "100%",          // Set the container height to 100% of the viewport height
    flexDirection: "column",  // Stack elements vertically
    
  };

  return (
    <div style={messageStyle}>
      <div 
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        borderRadius:"20px", 
        // border: ".3em solid #ffffff", 
        display: "flex",
        justifyContent: "center", // Horizontal centering
        alignItems: "center",     // Vertical centering
        height: "25%" , 
        width: "fit-content",       // Set the container height to 100% of the viewport height
        flexDirection: "column",
        padding:"8px",
      }}
      >
      
        {/* <h1>Wally's World</h1> */}
        <CountdownTimer/>
        <p style={{fontSize: ".9em", fontStyle: "italic", }}>Coming 12/2/23</p></div>
      
    
    </div>
  );
}

export default Message;
