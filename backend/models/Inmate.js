//backend/models/inmate.js
const mongoose = require('mongoose');

const InmateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  relation: String,
  facultyId: String,
  checkIn: Date,
  checkOut: Date
});

module.exports = mongoose.model('Inmate', InmateSchema);

