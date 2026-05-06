const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const mongoose = require('mongoose');
const Property = require('../../../models/Property');
const fetch = global.fetch || require('node-fetch');
const router = express.Router();

router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).render('admin/dashboard', {
        user: req.user,
        properties: [],
        error: 'Database not connected.'
      });
    }

    let properties = [];
    try {
      properties = await Property.find({}).lean();
    } catch (queryError) {
      properties = [];
    }

    // Fetch weather forecast for Wailea, Maui if API key is provided
    let weather = null;
    try {
      const key = process.env.OPENWEATHER_API_KEY;
      if (key) {
        // Wailea, Maui coordinates
        const lat = 20.7139;
        const lon = -156.4380;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          // compute simple next-24h rain probability and current temp
          const now = Date.now();
          const next24 = data.list.filter(item => (new Date(item.dt * 1000) - now) < 24 * 3600 * 1000);
          const rainForecast = next24.map(i => ({ dt: i.dt, dt_txt: i.dt_txt, rain: i.rain && i.rain['3h'] ? i.rain['3h'] : 0, pop: i.pop, temp: i.main && i.main.temp }));
          weather = {
            city: data.city && data.city.name,
            list: rainForecast,
            summary: rainForecast.length ? `${Math.round(rainForecast.reduce((s, r) => s + (r.pop || 0), 0) / rainForecast.length * 100)}% chance of precipitation in next 24h` : 'No forecast'
          };
        }
      } else {
        // Default weather object when API key is not set
        weather = {
          city: 'Wailea, Maui',
          list: [],
          summary: 'Weather API not configured. Add OPENWEATHER_API_KEY to .env'
        };
      }
    } catch (e) {
      // Fallback default weather
      weather = {
        city: 'Wailea, Maui',
        list: [],
        summary: 'Weather data unavailable'
      };
    }

    res.render('admin/dashboard', {
      user: req.user,
      properties,
      weather,
      error: null
    });
  } catch (err) {
    res.status(500).send('Server error: ' + (err && err.message));
  }
});

module.exports = router;
