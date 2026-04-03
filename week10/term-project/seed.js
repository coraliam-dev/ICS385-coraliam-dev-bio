const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const sampleProperties = [
	{
		name: "The Lahaina Shores Eco-Retreat",
		island: "Maui",
		type: "vacation rental",
		description: "A sustainable luxury villa overlooking the ocean.",
		amenities: ["Solar Power", "Private Pool", "Organic Garden"],
		targetSegment: "Eco-conscious luxury travelers",
		imageURL: "https://example.com/lahaina.jpg"
	},
	{
		name: "Hana Cloud Hotel",
		island: "Maui",
		type: "hotel",
		description: "Remote hotel at the end of the Road to Hana.",
		amenities: ["Spa", "Hiking Trails", "Local Cafe"],
		targetSegment: "Adventure seekers",
		imageURL: "https://example.com/hana.jpg"
	},
	{
		name: "Wailea Family Suites",
		island: "Maui",
		type: "hotel",
		description: "Family-friendly resort with water slides.",
		amenities: ["Kids Club", "Beach Access", "Kitchenette"],
		targetSegment: "Families",
		imageURL: "https://example.com/wailea.jpg"
	},
	{
		name: "Upcountry Farm Stay",
		island: "Maui",
		type: "vacation rental",
		description: "Cozy cottage in Kula surrounded by protea farms.",
		amenities: ["Fireplace", "Farm-to-table breakfast"],
		targetSegment: "Couples",
		imageURL: "https://example.com/kula.jpg"
	},
	{
		name: "Kapalua Golf Villas",
		island: "Maui",
		type: "vacation rental",
		description: "Upscale condos near world-class golf courses.",
		amenities: ["Golf Course Access", "Tennis Courts"],
		targetSegment: "Golf enthusiasts",
		imageURL: "https://example.com/kapalua.jpg"
	}
];

mongoose.connect(process.env.MONGODB_URI)
	.then(async () => {
		console.log("Connected to MongoDB...");
		await Property.deleteMany({}); // Clears existing data
		await Property.insertMany(sampleProperties);
		console.log("5 Maui properties seeded successfully!");
		process.exit();
	})
	.catch(err => {
		console.error("Connection error:", err);
		process.exit(1);
	});
