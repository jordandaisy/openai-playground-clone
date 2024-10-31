/*import axios from 'axios';

export const sendPromptWithContext = async (conversationHistory, model = 'o1-preview', temperature = 0.5, apiKey) => {
  const messages = Array.isArray(conversationHistory)
    ? conversationHistory.map(({ role, content }) => ({ role, content }))
    : [{ role: 'user', content: conversationHistory }];

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages,
      temperature
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`, // Use the user-provided API key
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in API request:', error);
    return 'Error with API request';
  }
};
*/
import axios from 'axios';

export const sendPromptWithContext = async (conversationHistory, model = 'o1-preview', temperature = 0.5, apiKey) => {
  const messages = Array.isArray(conversationHistory)
    ? conversationHistory.map(({ role, content }) => ({ role, content }))
    : [{ role: 'user', content: conversationHistory }];

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages,
      temperature
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error with API request:', error);
    // Return a detailed error message
    return { error: error.response?.data?.error?.message || error.message || 'Unknown error with API request' };
  }
};




/*
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  },
});

/**
 * Send a prompt with context for conversation or distillation.
 * @param {Array|Object} input - Either a conversation history array or a single prompt object.
 * @param {string} model - Model to use, e.g., 'gpt-3.5-turbo' or 'gpt-4'.
 * @param {number} temperature - Controls response randomness.
 * @param {number} maxTokens - Max tokens for response.
 * @param {number} frequencyPenalty - Frequency penalty for word repetition.
 * @param {number} presencePenalty - Presence penalty for introducing new topics.
 *//*
export const sendPromptWithContext = async (
  input,
  model = 'gpt-3.5-turbo',
  temperature = 0.5,
  maxTokens = 100,
  frequencyPenalty = 0,
  presencePenalty = 0
) => {
  // Determine if input is a full conversation or a single prompt
  const messages = Array.isArray(input)
    ? input.map(({ role, content }) => ({ role, content }))
    : [{ role: 'user', content: input.content }]; // Handle single prompt

  try {
    const response = await apiService.post('/chat/completions', {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in API request:', error);
    return 'Error with API request';
  }
};


/*
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  },
});

export const sendPromptWithContext = async (conversationHistory, model = 'gpt-3.5-turbo', temperature = 0.5, maxTokens = 100, frequencyPenalty = 0, presencePenalty = 0) => {
  // Check if `conversationHistory` is a single prompt (for Distill) or full conversation
  const messages = Array.isArray(conversationHistory)
    ? conversationHistory.map(({ role, content }) => ({ role, content }))
    : [{ role: 'user', content: conversationHistory }];

  try {
    const response = await apiService.post('/chat/completions', {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in API request:', error);
    return 'Error with API request';
  }
};

*/