const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], required: true },
  phone: { type: String, required: true },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
