const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  nurseName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  serviceDescription: {
    type: String,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String, // Store the URL or path to the image
    required: true
  }
});

module.exports = mongoose.model('Nurse', nurseSchema);