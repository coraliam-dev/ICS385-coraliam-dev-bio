const mongoose = require('mongoose');
const Customer = require('./customerModel');
const Hotel = require('./hotelModel');
const Amenities = require('./amenitiesModel');

const LOCAL_URI = process.env.MONGO_LOCAL_URI || 'mongodb://127.0.0.1:27017/myCustomerDB';
const ATLAS_URI = process.env.MONGO_ATLAS_URI;

async function runFor(uri, label) {
  await mongoose.connect(uri);
  console.log(`Connected to ${label}.`);

  try {
    // CUSTOMER
    await Customer.deleteMany({});
    const insertedCustomers = await Customer.insertMany([
      { firstName: 'John', lastName: 'Doe', email: `john.${label}@example.com`, phone: '555-123-4567' },
      { firstName: 'Jane', lastName: 'Doe', email: `jane.${label}@example.com`, phone: '555-987-6543' },
      { firstName: 'Alice', lastName: 'Johnson', email: `alice.${label}@example.com`, phone: '555-555-1234' }
    ]);
    console.log('Inserted customers:', insertedCustomers.length);

    const doeCustomers = await Customer.find({ lastName: 'Doe' });
    console.log("Found customers with lastName='Doe':", doeCustomers.length);

    // HOTEL
    await Hotel.deleteMany({});
    const insertedHotels = await Hotel.insertMany([
      { name: 'Maui Breeze Hotel', rating: 4.5, location: 'Kihei, Maui', description: 'Beachfront boutique hotel.' },
      { name: 'Hana Cloud Hotel', rating: 4.2, location: 'Hana, Maui', description: 'Remote scenic stay in Hana.' },
      { name: 'Kapalua Ridge Resort', rating: 4.8, location: 'Kapalua, Maui', description: 'Luxury resort near golf courses.' }
    ]);
    console.log('Inserted hotels:', insertedHotels.length);

    // AMENITIES
    await Amenities.deleteMany({});
    const insertedAmenities = await Amenities.insertMany([
      { hotelName: 'Maui Breeze Hotel', pool: true, lawn: true, BBQ: false, laundry: true },
      { hotelName: 'Hana Cloud Hotel', pool: false, lawn: true, BBQ: true, laundry: true },
      { hotelName: 'Kapalua Ridge Resort', pool: true, lawn: false, BBQ: true, laundry: true }
    ]);
    console.log('Inserted amenities:', insertedAmenities.length);

    // REQUIRED QUERIES
    const hotelByName = await Hotel.findOne({ name: 'Hana Cloud Hotel' });
    const amenitiesByPool = await Amenities.find({ pool: true });

    console.log('Hotel query by name:', hotelByName?.name);
    console.log('Amenities query by pool=true:', amenitiesByPool.length);
  } catch (error) {
    console.error(`${label} error:`, error.message);
  } finally {
    await mongoose.disconnect();
    console.log(`Disconnected from ${label}.`);
  }
}

(async () => {
  await runFor(LOCAL_URI, 'local');

  if (ATLAS_URI && !ATLAS_URI.includes('<')) {
    await runFor(ATLAS_URI, 'atlas');
  } else {
    console.log('Atlas skipped. Set a real MONGO_ATLAS_URI.');
  }
})();