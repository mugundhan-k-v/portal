//backend/models/Complaint.js
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  category: String,
  description: String,
  status: String,
  quarters: String,
  name: String,
  phone: String,
  facultyId: String
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
