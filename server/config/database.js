const mongoose = require('mongoose');

module.exports = async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow';
    console.log('Checking connection to MongoDB...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log(`Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};
