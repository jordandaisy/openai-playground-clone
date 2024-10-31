/*import React from 'react';
import MessageBubble from './MessageBubble';
import '../styles/ChatInterface.css';

function ChatInterface({ conversationHistory, handleDistill, distilledResponse, handleEvaluate, evaluations }) {
  return (
    <div className="chat-window">
      {conversationHistory.map((entry, index) => (
        <div key={index} className="message-container">
          <MessageBubble role={entry.role} content={entry.content} />
          {entry.role === 'assistant' && (
            <div className="actions">
              <button onClick={() => handleEvaluate(index, '👍')}>👍</button>
              <button onClick={() => handleEvaluate(index, '👎')}>👎</button>
              <button onClick={() => handleDistill(entry.content)}>Distill</button>
              {evaluations[index] && <span className="rating"> Rating: {evaluations[index]}</span>}
            </div>
          )}
        </div>
      ))}
      {distilledResponse && (
        <div className="distilled-response">
          <strong>Distilled Response:</strong> {distilledResponse}
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
*/
import React from 'react';

function ChatInterface({ conversationHistory, handleDistill, distilledResponse }) {
  return (
    <div className="chat-interface">
      {conversationHistory.map((entry, index) => {
        if (!entry || !entry.content || !entry.role) {
          // If entry is undefined or missing required properties, skip rendering it
          console.warn(`Invalid conversation entry at index ${index}:`, entry);
          return null;
        }

        return (
          <div key={index} className={`chat-entry ${entry.role}`}>
            <p>{entry.content}</p>
            {entry.role === 'assistant' && (
              <div>
                <button onClick={() => handleDistill(entry.content)}>Distill</button>
                {distilledResponse && <div><strong>Distilled Response:</strong> {distilledResponse}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatInterface;
