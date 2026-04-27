#!/usr/bin/env node
/*
  seed-properties.js
  Inserts the Kai Nani (Beautiful Sea) property into the properties collection
  Uses `mongosh` shell via child_process so it doesn't depend on mongoose state.
*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// load .env if present
const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) require('dotenv').config({ path: dotenvPath });

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ics385_week14';

const doc = {
  name: "Kai Nani (Beautiful Sea)",
  island: "Maui",
  type: "hotel",
  description: "Luxury beachfront resort.",
  amenities: ["spa", "pool", "fine dining"],
  targetSegment: "Luxury wellness travelers, honeymooners, and couples seeking restorative spa experiences on Maui.",
  imageURL: "https://placehold.co/600x400"
};

const js = `
const existing = db.properties.findOne({ name: ${JSON.stringify(doc.name)} });
if (existing) {
  print('exists');
  printjson(existing);
} else {
  const r = db.properties.insertOne(${JSON.stringify(doc)});
  print('inserted');
  printjson(r);
}
`;

try {
  console.log('Seeding properties via mongosh...');
  const out = execSync(`mongosh ${JSON.stringify(mongoUri)} --eval ${JSON.stringify(js)}`, { stdio: 'pipe' }).toString();
  console.log(out);
  console.log('Done.');
} catch (err) {
  console.error('Error running mongosh:', err.message);
  if (err.stdout) console.error(err.stdout.toString());
  if (err.stderr) console.error(err.stderr.toString());
  process.exit(1);
}
require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../../models/Property');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ics385_week14';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding properties');

  const sample = {
    name: 'Kai Nani Hotel',
    island: 'Oahu',
    type: 'hotel',
    description: 'Comfortable beachfront hotel with aloha spirit.',
    amenities: ['pool', 'wifi', 'parking'],
    targetSegment: 'leisure',
    imageURL: 'https://placehold.co/600x400'
  };

  try {
    const existing = await Property.findOne({ name: sample.name });
    if (existing) {
      console.log('Sample property already exists. Skipping insert.');
    } else {
      const p = new Property(sample);
      await p.save();
      console.log('Inserted sample property:', p._id.toString());
    }
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run();
