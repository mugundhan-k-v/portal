//backend/models/Guest.js
const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  from: String,
  in: Date,
  out: Date,
  facultyId: String
});

module.exports = mongoose.model('Guest', GuestSchema);
