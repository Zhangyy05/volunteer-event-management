const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
