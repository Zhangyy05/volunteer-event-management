const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true }, // in hours
  maxVolunteers: { type: Number, required: true },
  volunteerCount: { type: Number, default: 0 },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
