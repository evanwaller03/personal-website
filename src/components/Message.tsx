import React from 'react';
import CountdownTimer from './CountdownTimer';

function Message({ onSecretClick }: any) {
  const messageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center",     // Vertical centering
    height: "100%",          // Set the container height to 100% of the viewport height
    flexDirection: "column",  // Stack elements vertically
    
  };

  // Add the invisible button
  const secretButtonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '0', // Adjust as needed to position in the bottom-right corner
    right: '0', // Adjust as needed to position in the bottom-right corner
    width: '50px',
    height: '50px',
    opacity: '0', // Make the button invisible
    cursor: 'pointer' // Change the cursor to indicate clickable area
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
        <CountdownTimer/>
        <p style={{fontSize: ".9em", fontStyle: "italic", }}>Coming 1/1/24</p></div>
        <button style={secretButtonStyle} onClick={onSecretClick} aria-label="Secret button to chatbot" />
    
    </div>
  );
}

export default Message;
