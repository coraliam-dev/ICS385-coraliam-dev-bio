const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const mongoose = require('mongoose');
const Property = require('../../../models/Property');
const router = express.Router();

// GET /admin/dashboard — protected: only accessible if logged in
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    console.log('Mongoose readyState:', mongoose.connection.readyState);
    console.log('Mongo host:', mongoose.connection.host);
    // If mongoose is not connected, short-circuit with 503 so requests fail fast
    if (mongoose.connection.readyState !== 1) {
      console.warn('DB not connected; readyState=', mongoose.connection.readyState);
      return res.status(503).render('admin/dashboard', {
        user: req.user,
        properties: [],
        error: 'Database not connected (please check mongod).'
      });
    }

    // Quick ping to ensure the DB socket is responsive before running queries
    try {
      if (mongoose.connection.db && mongoose.connection.db.admin) {
        await mongoose.connection.db.admin().ping();
      }
    } catch (pingErr) {
      console.error('DB ping failed:', pingErr);
      return res.status(503).render('admin/dashboard', {
        user: req.user,
        properties: [],
        error: 'Database ping failed: ' + (pingErr && pingErr.message)
      });
    }

    // Use native driver for properties to avoid intermittent Mongoose model timeouts
    let properties = [];
    try {
      const coll = mongoose.connection.db.collection('properties');
      properties = await coll.find({}).toArray();
    } catch (nativeErr) {
      console.error('Native properties query failed:', nativeErr);
      // fall back to empty list
      properties = [];
    }

    res.render('admin/dashboard', {
      user: req.user,
      properties: properties
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error: ' + (err && err.message));
  }
});

module.exports = router;
