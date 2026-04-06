const express = require('express');
const mongoose = require('mongoose');
const Property = require('../models/Property');

const router = express.Router();

// GET /properties
// Optional filters: ?island=Maui&minRating=4&maxRating=5
router.get('/', async (req, res) => {
  try {
    const { island, minRating, maxRating } = req.query;
    const query = {};

    if (island) query.island = island;

    const ratingOps = {};
    if (minRating !== undefined) ratingOps.$gte = Number(minRating);
    if (maxRating !== undefined) ratingOps.$lte = Number(maxRating);

    if (Object.keys(ratingOps).length > 0) {
      query.reviews = { $elemMatch: { rating: ratingOps } };
    }

    const properties = await Property.find(query).sort({ name: 1 });

    if (req.query.format === 'json' || !req.accepts('html')) {
      return res.json(properties);
    }

    return res.render('properties', { properties, filters: { island, minRating, maxRating } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /properties/:id
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid property id' });
    }

    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    return res.json(property);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /properties/:id/reviews
router.post('/:id/reviews', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid property id' });
    }

    const { guestName, rating, comment } = req.body;

    if (!guestName || !comment || rating === undefined) {
      return res.status(400).json({ message: 'guestName, rating, and comment are required' });
    }

    const ratingNumber = Number(rating);
    if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ message: 'rating must be an integer between 1 and 5' });
    }

    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    property.reviews.push({
      guestName,
      rating: ratingNumber,
      comment,
      date: new Date()
    });

    await property.save();

    return res.status(201).json({
      message: 'Review added',
      propertyId: property._id,
      review: property.reviews[property.reviews.length - 1]
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;