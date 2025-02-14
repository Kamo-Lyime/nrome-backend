// patients.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  medications: { type: [String], required: true },
  deliveryDate: { type: Date, required: true },
  deliveryAddress: { type: String, required: true },
  additionalComments: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;