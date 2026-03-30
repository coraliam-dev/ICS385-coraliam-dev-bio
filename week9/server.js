// Simple Express server to serve weather API key securely
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Endpoint to get API key (for demo only; in production, proxy the API call instead)
app.get('/apikey', (req, res) => {
    res.json({ key: process.env.OPENWEATHER_API_KEY });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
