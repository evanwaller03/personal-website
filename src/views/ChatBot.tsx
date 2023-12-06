import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatBot = () => {
    const pageStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center", // Horizontal centering
        alignItems: "center",     // Vertical centering
        height: "100%",          // Set the container height to 100% of the viewport height
        flexDirection: "column",  // Stack elements vertically
        width: "100%",
      };

    return (
        <div style={pageStyle}>
            <h1>Evan GPT Waller</h1>
            <ChatInterface/>
        </div>
    )
}

export default ChatBot;