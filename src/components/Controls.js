import React from 'react';

function Controls({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  frequencyPenalty,
  setFrequencyPenalty,
  presencePenalty,
  setPresencePenalty
}) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        Temperature:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
        {temperature}
      </label>
      <label>
        Max Tokens:
        <input
          type="number"
          min="1"
          max="4096"
          value={maxTokens}
          onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        Frequency Penalty:
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={frequencyPenalty}
          onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
        />
        {frequencyPenalty}
      </label>
      <label>
        Presence Penalty:
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={presencePenalty}
          onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
        />
        {presencePenalty}
      </label>
    </div>
  );
}

export default Controls;
