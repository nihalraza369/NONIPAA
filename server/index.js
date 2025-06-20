const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize OpenRouter SDK
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173/',  // Change to your deployed frontend URL in prod
    'X-Title': 'My Custom Chatbot'
  }
});

// POST /chat
app.post('/chat', async (req, res) => {
  const { messages, model = 'openai/gpt-3.5-turbo' } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format. Expected an array.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    const reply = completion.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    console.error('❌ OpenRouter Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI response error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
