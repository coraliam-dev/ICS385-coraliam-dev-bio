const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Hotel', hotelSchema);
