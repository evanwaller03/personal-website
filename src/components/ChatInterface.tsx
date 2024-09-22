import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa6";
import axios from 'axios';

interface Message {
  type: 'User' | 'WallerGPT';
  text: string;
}

const ChatInterface = () => {
  const [question, setQuestion] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobile = windowWidth < 600;
  const [loading, setLoading] = useState<boolean>(false);

  // Use an environment variable for the API URL
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

    if (!question.trim()) return;

    const userMessage: Message = { type: 'User', text: question };
    setConversation(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    console.log('API URL:', apiUrl);
    try {
      const response = await axios.post(`${apiUrl}/query/`, {
        question: userMessage.text,
      });

      setConversation(prev => [...prev, { type: 'WallerGPT', text: response.data.answer }]);
    } catch (error) {
      console.error('Error fetching the answer:', error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.detail
          ? error.response.data.detail
          : 'An error occurred while fetching the answer.';
      setConversation(prev => [...prev, { type: 'WallerGPT', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: isMobile ? '90%' : '35%', height: isMobile ? '80%' : '90%' }}>
      <div style={{ overflowY: 'scroll', height: '80%' }}>
        <p>WallerGPT: Please feel free to ask a question about Evan's resume, his personal interests, his coding projects, etc.</p>
        <div className="soft-grey-line"></div>
        {conversation.map((msg, index) => (
          <div key={index} style={{ color: msg.type === 'User' ? '#ceced8' : '#ffffff', marginBottom: '15px' }}>
            <strong style={{ fontSize: "1.1em" }}>{msg.type}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: '100%',
          height: '30px',
          padding: '0px',
        }}
      >
        <input
          style={{ height: "100%", width: '90%' }}
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question about Evan..."
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#ffffff',
            width: '9%',
            color: '#343541',
            marginLeft: '1%',
            padding: '0px',
            height: '100%',
          }}
          disabled={loading}
        >
          {loading ? '...' : <FaArrowUp style={{ fontSize: '23px' }} />}
        </button>
      </form>

      <p style={{ fontSize: '12px' }}>
        Responses from OpenAI may be incorrect. Please reach out to Evan if you have questions! Note: chats don't build off each other. I'm working on that.
      </p>
    </div>
  );
};

export default ChatInterface;
