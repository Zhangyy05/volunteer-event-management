const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Volunteer = require('../models/Volunteer');
const mongoose = require('mongoose');


// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
    console.log("hiiiii");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const { name, date, location, duration, maxVolunteers, organizer, volunteers } = req.body;

  try {
    const newEvent = new Event({
      name,
      date,
      location,
      duration,
      maxVolunteers,
      organizer,
      volunteers,
      volunteerCount: volunteers.length,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, duration, maxVolunteers, organizer, volunteers } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, location, duration, maxVolunteers, organizer, volunteers, volunteerCount: volunteers.length },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting event with ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    // Find and delete the event by ID
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('Event deleted successfully');
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Error occurred while deleting event:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
