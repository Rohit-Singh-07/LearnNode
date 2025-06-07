const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mydatabase'; 

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('open', () => {
  console.log('MongoDB connected successfully');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Attempt to connect to MongoDB
mongoose.connect(mongoURI)
  .catch((error) => {
    console.error('Initial MongoDB connection error:', error);
  });

  module.exports  = db;
