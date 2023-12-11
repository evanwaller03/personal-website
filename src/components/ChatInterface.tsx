// ChatInterface.js

import React, { useState } from 'react';

const ChatInterface = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = { prompt: question };
    
    try {
      const response = await fetch('http://34.28.122.14:8000/ask', {
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
  

  const testCORS = async () => {
    try {
      const response = await fetch('http://34.28.122.14:8000/test-cors', {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      console.log('CORS Test Response:', jsonResponse);
    } catch (error) {
      console.error("Error in CORS test: ", error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask a question..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Response from GPT:</p>
        <textarea value={response} readOnly />
      </div>
      <button onClick={testCORS}>Test CORS</button> {/* CORS Test Button */}
    </div>
  );
  
};

export default ChatInterface;
