/*import React, { useState, useEffect } from 'react';
import { sendPromptWithContext } from '../apiService';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import '../styles/Playground.css';

function Playground() {
  const [prompt, setPrompt] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [model, setModel] = useState('o1-preview');
  const [systemInstructions, setSystemInstructions] = useState('');
  const [apiKey, setApiKey] = useState(''); // State for API key
  const [conversationId] = useState(Date.now());
  const [date, setDate] = useState(new Date().toLocaleString());
  //const [evaluations, setEvaluations] = useState([]);
  const [distilledResponse, setDistilledResponse] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [maxTokens, setMaxTokens] = useState(8192);

  const estimateTokens = (text) => Math.ceil(text.length / 4); // Approximate tokens

  const handleDistill = async (response) => {
    const distillPrompt = `Please summarize the following response: "${response}"`;
    const result = await sendPromptWithContext([{ role: 'user', content: distillPrompt }], model, temperature, apiKey);
  
    const tokensUsed = result?.usage?.total_tokens || 0;
    setTotalTokens(totalTokens + tokensUsed);
  
    setDistilledResponse(result);
  };
  
  const truncateToMaxTokens = (documentContext, conversationHistory, maxTokens) => {
    let currentTokens = estimateTokens(documentContext);
    const adjustedHistory = [...conversationHistory];

    adjustedHistory.forEach((msg) => {
      currentTokens += estimateTokens(msg.content);
    });

    while (currentTokens > maxTokens) {
      if (adjustedHistory.length > 0) {
        const removedMessage = adjustedHistory.shift();
        currentTokens -= estimateTokens(removedMessage.content);
      } else {
        documentContext = documentContext.slice(0, documentContext.length - 100);
        currentTokens = estimateTokens(documentContext);
      }
    }

    return { truncatedDocumentContext: documentContext, truncatedHistory: adjustedHistory };
  };

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date().toLocaleString()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Load saved conversation history and API key from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('conversationHistory');
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedHistory) {
      setConversationHistory(JSON.parse(savedHistory));
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save conversation history and API key to localStorage
  useEffect(() => {
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    localStorage.setItem('apiKey', apiKey);
  }, [conversationHistory, apiKey]);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      alert("Please enter your API key in the settings.");
      return;
    }
  
    const { truncatedDocumentContext, truncatedHistory } = truncateToMaxTokens(systemInstructions, conversationHistory, maxTokens);
  
    const updatedHistory = [
      { role: 'system', content: truncatedDocumentContext },
      ...truncatedHistory,
      { role: 'user', content: prompt }
    ];
  
    const result = await sendPromptWithContext(updatedHistory, model, temperature, apiKey);
    const tokensUsed = result?.usage?.total_tokens || 0;
    setTotalTokens(totalTokens + tokensUsed);
  
    // Only add if result is defined and has content
    if (result) {
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: result }
      ]);
    }
  
    setPrompt('');
    setDistilledResponse('');
  };
  

  return (
    <div className="playground-container">
      <Sidebar 
        model={model} 
        setModel={setModel} 
        temperature={temperature} 
        setTemperature={setTemperature} 
        systemInstructions={systemInstructions}
        setSystemInstructions={setSystemInstructions}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        apiKey={apiKey}
        setApiKey={handleApiKeyChange} // Pass the API key handler to Sidebar
      />
      <div className="chat-container">
        <div className="metadata">
          <span>Conversation ID: {conversationId}</span>
          <span>Date: {date}</span>
          <span>Total Tokens Used: {totalTokens}</span>
        </div>
        <ChatInterface 
          conversationHistory={conversationHistory} 
          handleDistill={handleDistill} 
          distilledResponse={distilledResponse} 
        />
        <div className="input-container">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            rows="3"
            className="prompt-input"
          />
          <button onClick={handleSubmit} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playground;
*/
import React, { useState, useEffect } from 'react';
import { sendPromptWithContext } from '../apiService';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import '../styles/Playground.css';

function Playground() {
  const [prompt, setPrompt] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [model, setModel] = useState('o1-preview');
  const [systemInstructions, setSystemInstructions] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [conversationId] = useState(Date.now());
  const [date, setDate] = useState(new Date().toLocaleString());
  const [distilledResponse, setDistilledResponse] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [maxTokens, setMaxTokens] = useState(8192);
  const [error, setError] = useState(''); // State for error messages

    // Helper function to estimate tokens
  const estimateTokens = (text) => Math.ceil(text.length / 4); // Approximate token count

  // Function to truncate document context and conversation history to fit within max tokens
  const truncateToMaxTokens = (documentContext, conversationHistory, maxTokens) => {
    let currentTokens = estimateTokens(documentContext);
    const adjustedHistory = [...conversationHistory];

    // Add tokens for each message and truncate if necessary
    adjustedHistory.forEach((msg) => {
      currentTokens += estimateTokens(msg.content);
    });

    while (currentTokens > maxTokens) {
      if (adjustedHistory.length > 0) {
        const removedMessage = adjustedHistory.shift();
        currentTokens -= estimateTokens(removedMessage.content);
      } else {
        documentContext = documentContext.slice(0, documentContext.length - 100);
        currentTokens = estimateTokens(documentContext);
      }
    }

    return { truncatedDocumentContext: documentContext, truncatedHistory: adjustedHistory };
  };

  const handleDistill = async (response) => {
    const distillPrompt = `Please summarize the following response: "${response}"`;
    const result = await sendPromptWithContext([{ role: 'user', content: distillPrompt }], model, temperature, apiKey);
  
    const tokensUsed = result?.usage?.total_tokens || 0;
    setTotalTokens(totalTokens + tokensUsed);
  
    setDistilledResponse(result);
  };
  
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date().toLocaleString()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedHistory = localStorage.getItem('conversationHistory');
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedHistory) {
      setConversationHistory(JSON.parse(savedHistory));
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    localStorage.setItem('apiKey', apiKey);
  }, [conversationHistory, apiKey]);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      setError("Please enter your API key in the settings.");
      return;
    }

    setError(''); // Clear previous errors

    const { truncatedDocumentContext, truncatedHistory } = truncateToMaxTokens(systemInstructions, conversationHistory, maxTokens);

    const updatedHistory = [
      { role: 'system', content: truncatedDocumentContext },
      ...truncatedHistory,
      { role: 'user', content: prompt }
    ];

    const result = await sendPromptWithContext(updatedHistory, model, temperature, apiKey);

    // Check if there was an error in the result
    if (result?.error) {
      setError(result.error);
      return;
    }

    const tokensUsed = result?.usage?.total_tokens || 0;
    setTotalTokens(totalTokens + tokensUsed);

    setConversationHistory([
      ...updatedHistory,
      { role: 'assistant', content: result }
    ]);

    setPrompt('');
    setDistilledResponse('');
  };

  return (
    <div className="playground-container">
      <Sidebar 
        model={model} 
        setModel={setModel} 
        temperature={temperature} 
        setTemperature={setTemperature} 
        systemInstructions={systemInstructions}
        setSystemInstructions={setSystemInstructions}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        apiKey={apiKey}
        setApiKey={handleApiKeyChange}
      />
      <div className="chat-container">
        <div className="metadata">
          <span>Conversation ID: {conversationId}</span>
          <span>Date: {date}</span>
          <span>Total Tokens Used: {totalTokens}</span>
        </div>
        {error && <div className="error-message">Error: {error}</div>}
        <ChatInterface 
          conversationHistory={conversationHistory} 
          handleDistill={handleDistill} 
          distilledResponse={distilledResponse} 
        />
        <div className="input-container">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            rows="3"
            className="prompt-input"
          />
          <button onClick={handleSubmit} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playground;
