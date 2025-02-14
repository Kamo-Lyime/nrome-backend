// server.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('./patients'); // Ensure the correct path to the Patient model

const app = express(); // Initialize the app

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server after successful connection to MongoDB
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define routes here or import route modules
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Example route to create a new patient (adjust as needed)
app.post('/api/orders', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error saving order', error: error.message });
  }
});