const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
	name: { type: String, required: true },
	island: { type: String, required: true },
	type: {
		type: String,
		enum: ['hotel', 'vacation rental'],
		required: true
	},
	description: String,
	amenities: [String], // Array of strings
	targetSegment: String,
	imageURL: String
});

module.exports = mongoose.model('Property', propertySchema);
