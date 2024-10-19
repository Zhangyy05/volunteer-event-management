const express = require('express');
const router = express.Router();
const Organizer = require('../models/Organizer');

// Get all organizers
router.get('/', async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new organizer
router.post('/', async (req, res) => {
  const { name, contactEmail, phone } = req.body;

  try {
    const newOrganizer = new Organizer({ name, contactEmail, phone });
    const savedOrganizer = await newOrganizer.save();
    res.status(201).json(savedOrganizer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
