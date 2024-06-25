import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi, I am Neo Vet Assistant. Feel free to ask me any question related to your small friend and I will provide you the help you need." }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const response = await fetch('http://localhost:8080/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = { sender: 'bot', text: data.response };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <div id="chat-icon" onClick={toggleChat}>💬</div>
      <div id="chat-box" className={isOpen ? '' : 'hidden'}>
        <div id="chat-content">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender}>
              <strong>{msg.sender === 'user' ? 'You' : 'Neo Vet Assistant'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={sendMessage}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default Chatbot;
