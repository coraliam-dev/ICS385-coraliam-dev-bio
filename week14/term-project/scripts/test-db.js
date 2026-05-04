#!/usr/bin/env node
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const path = require('path');

// Ensure we import the same Property model used by the app (workspace root models)
// repo layout: <repo-root>/models/Property.js; this script lives in
// <repo-root>/week14/term-project/scripts/, so go up three levels to repo root
const Property = require(path.join(__dirname, '..', '..', '..', 'models', 'Property'));

mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
};

async function run() {
  try {
    console.log('Connecting to', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, mongooseOpts);
    console.log('Connected. readyState=', mongoose.connection.readyState);

    try {
      console.log('Pinging DB...');
      await mongoose.connection.db.admin().ping();
      console.log('Ping OK');
    } catch (pingErr) {
      console.error('Ping failed:', pingErr);
    }

    console.log('Listing collections via native driver...');
    try {
      const cols = await mongoose.connection.db.listCollections().toArray();
      console.log('Collections:', cols.map(c => c.name));
    } catch (lcErr) {
      console.error('listCollections error:', lcErr);
    }

    console.log('Running native collection countDocuments and findOne...');
    try {
      const coll = mongoose.connection.db.collection('properties');
      const count = await coll.countDocuments();
      console.log('Native countDocuments:', count);
      const one = await coll.findOne();
      console.log('Native findOne result:', one);
    } catch (nativeErr) {
      console.error('Native collection error:', nativeErr);
    }

    console.log('Running Mongoose model Property.find({})...');
    try {
      const props = await Property.find({}).lean().exec();
      console.log('Mongoose found', props.length, 'properties');
      if (props.length) console.log(props[0]);
    } catch (modelErr) {
      console.error('Mongoose model error:', modelErr);
    }

  } catch (err) {
    console.error('Error during test query:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
