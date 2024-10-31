import React from 'react';
import '../styles/MessageBubble.css';

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <p>{content}</p>
    </div>
  );
}

export default MessageBubble;
