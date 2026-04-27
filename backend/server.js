// backend/server.js
// Express API for Media Tracker

const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
const PORT = 5000; // Change if you need a different port

app.use(cors()); // Allow all origins (dev only)
app.use(express.json()); // Parse JSON bodies

// GET all media URLs
app.get('/api/media', (req, res) => {
  res.json(data.getAll());
});

// POST a new media URL
app.post('/api/media', (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const newEntry = data.add(url);
  res.status(201).json(newEntry);
});

// Simple health check
app.get('/api/health', (req, res) => res.send('OK'));

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
