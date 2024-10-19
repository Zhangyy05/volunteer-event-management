const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new volunteer
router.post('/', async (req, res) => {
  const { name, email, skills, phone } = req.body;

  try {
    const newVolunteer = new Volunteer({ name, email, skills, phone });
    const savedVolunteer = await newVolunteer.save();
    res.status(201).json(savedVolunteer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
