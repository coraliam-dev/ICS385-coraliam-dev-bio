const mongoose = require('mongoose');

const amenitiesSchema = new mongoose.Schema({
  hotelName: { type: String, required: true, trim: true },
  pool: { type: Boolean, default: false },
  lawn: { type: Boolean, default: false },
  BBQ: { type: Boolean, default: false },
  laundry: { type: Boolean, default: false }
});

module.exports = mongoose.model('Amenities', amenitiesSchema);
