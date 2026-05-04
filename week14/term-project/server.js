require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', false);

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is required');
}

async function start() {
  await mongoose.connect(mongoUri);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = app;
