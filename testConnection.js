require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('MongoDB Atlas connection error:', error);
  });