//backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  facultyId: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  quarters: String,
  role: String
});

module.exports = mongoose.model('User', UserSchema);

