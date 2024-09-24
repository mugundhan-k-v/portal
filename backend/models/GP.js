const mongoose = require('mongoose');

const GPSchema = new mongoose.Schema({
  in: Date,
  out: Date,
  facultyId: String
});

module.exports = mongoose.model('GP', GPSchema);
