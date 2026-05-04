require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set in env');
    process.exit(1);
  }
  await mongoose.connect(mongoUri);
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'changeme';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists:', email);
    process.exit(0);
  }

  const user = new User({ email, password, role: 'admin', provider: 'local' });
  await user.save();
  console.log('Created admin user:', email);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
