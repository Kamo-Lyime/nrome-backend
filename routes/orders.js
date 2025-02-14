// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patientName: String,
  medications: [String],
  deliveryDate: Date,
  deliveryAddress: String,
  additionalComments: String,
  phoneNumber: String,
  email: String,
});

module.exports = mongoose.model('Order', orderSchema);