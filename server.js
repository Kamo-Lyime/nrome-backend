require('dotenv').config(); // Load environment variables
console.log('MongoDB URI:', process.env.MONGODB_URI);


// Import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Import Nurse model
const Nurse = require('./routes/nurse.model.js'); // Fixed path

// Initialize app
const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // To handle large profile picture uploads
app.use(cors());


// Define allowed origins
const allowedOrigins = [
  'https://www.nrome.co.za',
  'http://www.nrome.co.za',
  'http://nromefrontend.s3-website.af-south-1.amazonaws.com',
  'https://nromefrontend.s3-website.af-south-1.amazonaws.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5500',
 
];

// Configure CORS with more options
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API Endpoint to Save Nurse Data
app.post('/api/nurses', async (req, res) => {
  try {
      const nurse = new Nurse(req.body);
      const savedNurse = await nurse.save();
      res.status(201).json({ message: 'Nurse data saved successfully!', nurse: savedNurse });
  } catch (error) {
      console.error('Error saving nurse data:', error);
      res.status(500).json({ message: 'Error saving nurse data', error: error.message });
  }
});

// API Endpoint to Fetch Nurse Data
app.get('/api/nurses', async (req, res) => {
  try {
      const nurses = await Nurse.find();
      res.status(200).json(nurses);
  } catch (error) {
      console.error('Error fetching nurse data:', error);
      res.status(500).json({ message: 'Error fetching nurse data', error: error.message });
  }
});

// Define the Mongoose schema
const orderSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  medications: { type: [String], required: true },
  deliveryDate: { type: Date, required: true },
  deliveryAddress: { type: String, required: true },
  additionalComments: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model
const Order = mongoose.model('Order', orderSchema);

// API endpoint to handle order data
app.post('/api/orders', async (req, res) => {
  try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(201).json({ message: 'Order saved successfully!', order: savedOrder });
  } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB Atlas connection error:', error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
