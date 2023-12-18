import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa6";

const ChatInterface = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 600;

  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };

  useEffect(() => {
    // Function to update state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = { prompt: question };

    try {
      const response = await fetch('https://api.evanwaller.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      // Set response to the content of the message from OpenAI
      if (jsonResponse.response) {
        setResponse(jsonResponse.response);
      } else {
        // Handle any errors that don't result in an HTTP error (like a 500 status)
        setResponse("Error: " + jsonResponse.error);
      }
    } catch (error) {
      console.error("Error fetching the response: ", error);
      setResponse("Failed to get the response.");
    }
  };

  const divStyle: React.CSSProperties = {
    height: '80%', // Height auto-adjusts to content
    width: '100%',  // Same width as the textarea
    color: '#d1d5da', // Same text color
    backgroundColor: 'rgba(0,0,0,0)', // Same background color
    border: 'none', // No border
    whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
    overflowWrap: 'break-word', // Ensures text wraps to container
    padding: '10px' // Optional padding for better text appearance
};
  
  return (
    <div style={{width: isMobile ? '90%' : '35%', height: '70%'}}>

        <div style={divStyle}>
            {response ? <span style={{fontWeight:'bold', color: '#d1d5da'}}>WallerGPT: </span> : `Feel free to ask questions about Evan's resume, work experience, his programming knowledge, etc and the fine-tuned OpenAI model will do its best to respond.`}{response}
        </div>

        <form style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", width: '100%', height: '30px', padding: '0px'}} onSubmit={handleSubmit}>
          <input
            style={{height: "100%", width: '90%'}}
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question about Evan..."
          />
          <button style={{backgroundColor: '#ffffff', width: '9%', color: '#343541', marginLeft: '1%', padding:'0px', height:'100%'}} type="submit"><FaArrowUp style={{fontSize: '23px'}}/></button>
        </form>

        <p style={{fontSize:'12px'}}>Responses from OpenAI's API may be incorrect. Please reach out to me (Evan) if you have further questions!</p>

    </div>
  );
};

export default ChatInterface;