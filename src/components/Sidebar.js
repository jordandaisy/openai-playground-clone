import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ model, setModel, temperature, setTemperature, systemInstructions, setSystemInstructions, maxTokens, setMaxTokens, apiKey, setApiKey }) {
  return (
    <div className="sidebar">
      <h2>Settings</h2>
      <label>
        API Key:
        <input
          type="password"
          value={apiKey}
          onChange={setApiKey}
          placeholder="Enter your API key"
          className="api-key-input"
        />
      </label>
      <label>
        Model:
        <select value={model} onChange={(e) => setModel(e.target.value)} className="model-select">
          <option value="o1-preview">o1-preview</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </label>
      <label>
        Temperature:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="temperature-slider"
        />
        <span>{temperature}</span>
      </label>
      <label>
        System Instructions:
        <textarea
          value={systemInstructions}
          onChange={(e) => setSystemInstructions(e.target.value)}
          placeholder="Enter custom instructions for the assistant's behavior"
          className="system-instructions"
          rows="3"
        />
      </label>
      <label>
        Max Tokens:
        <input
          type="range"
          min="1000"
          max="8192"
          step="100"
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          className="token-slider"
        />
        <span>{maxTokens}</span>
      </label>
    </div>
  );
}

export default Sidebar;
