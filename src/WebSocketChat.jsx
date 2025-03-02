import React, { useState, useEffect, useRef } from 'react';

function WebSocketChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://192.168.130.229:8080/ws");

    // Set up event listener for incoming messages
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputValue && ws.current) {
      ws.current.send(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocketChat;
