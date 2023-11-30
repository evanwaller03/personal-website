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
      <h1>Wally's World</h1>
      <CountdownTimer/>
      <p style={{fontSize: ".9em", fontStyle: "italic"}}>Coming 12/2/23</p>
    </div>
  );
}

export default Message;
