import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa6";

interface Message {
  type: 'User' | 'WallerGPT';
  text: string;
}

const ChatInterface = () => {
  const [question, setQuestion] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobile = windowWidth < 600;

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMessage: Message = { type: 'User', text: question }; // Explicitly defining the type here
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setQuestion('');
  
    try {
      const data = { prompt: question };
      const response = await fetch('https://api.evanwaller.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      setConversation(convo => [...convo, { type: 'WallerGPT', text: jsonResponse.response || "Error: " + jsonResponse.error }]);
    } catch (error) {
      console.error("Error fetching the response: ", error);
      setConversation(convo => [...convo, { type: 'WallerGPT', text: "Failed to get the response." }]);
    }
  };
  

  return (
    <div style={{ width: isMobile ? '90%' : '35%', height: isMobile ? '70%' : '90%' }}>

      <div style={{ overflowY: 'scroll', height: '80%' }}>
        <p>WallerGPT: Please free to ask a question about Evan's resume, his personal interests, his coding projects, etc.</p>
        <div className="soft-grey-line"></div> 
        {conversation.map((msg, index) => (
          <div key={index} style={{ color: msg.type === 'User' ? '#ceced8' : '#ffffff', marginBottom: '15px'}}>
            <strong style={{fontSize:"1.1em"}}>{msg.type}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", width: '100%', height: '30px', padding: '0px' }}>
        <input
          style={{ height: "100%", width: '90%' }}
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question about Evan..."
        />
        <button type="submit" style={{ backgroundColor: '#ffffff', width: '9%', color: '#343541', marginLeft: '1%', padding: '0px', height: '100%' }}>
          <FaArrowUp style={{ fontSize: '23px' }} />
        </button>
      </form>

      <p style={{ fontSize: '12px' }}>Responses from OpenAI's API may be incorrect. Please reach out to me (Evan) if you have further questions!</p>

    </div>
  );
};

export default ChatInterface;
