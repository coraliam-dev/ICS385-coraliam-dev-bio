const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const mongoose = require('mongoose');
const Property = require('../../../models/Property');
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

    res.render('admin/dashboard', {
      user: req.user,
      properties,
      error: null
    });
  } catch (err) {
    res.status(500).send('Server error: ' + (err && err.message));
  }
});

module.exports = router;
