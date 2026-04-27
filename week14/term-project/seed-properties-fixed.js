#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
};

async function run() {
  try {
    console.log('Connecting to', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, mongooseOpts);
    console.log('Connected. readyState=', mongoose.connection.readyState);

    const coll = mongoose.connection.db.collection('properties');
    const existing = await coll.findOne({ name: 'Kai Nani (Beautiful Sea)' });
    if (existing) {
      console.log('Property already exists on target DB:', existing._id);
    } else {
      const doc = {
        name: 'Kai Nani (Beautiful Sea)',
        island: 'Maui',
        type: 'hotel',
        description: 'Luxury beachfront resort.',
        amenities: ['spa', 'pool', 'fine dining'],
        targetSegment: 'Luxury wellness travelers, honeymooners, and couples seeking restorative spa experiences on Maui.',
        imageURL: 'https://placehold.co/600x400'
      };
      const r = await coll.insertOne(doc);
      console.log('Inserted property with id', r.insertedId);
    }
  } catch (err) {
    console.error('Error seeding properties:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
