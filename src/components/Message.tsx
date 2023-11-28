import React from 'react';

function Message() {
  const messageStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center",     // Vertical centering
    height: "100vh",          // Set the container height to 100% of the viewport height
    flexDirection: "column",  // Stack elements vertically
  };

  return (
    <div style={messageStyle}>
      <h1>Wally's World</h1>
      <p>Coming 12/2/23</p>
    </div>
  );
}

export default Message;
