const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const mongoose = require('mongoose');


// Generate report with input validation and parameterized queries
router.post('/', async (req, res) => {
  const { organizer, startDate, endDate } = req.body;

  // Validate the organizer
  if (organizer && !mongoose.Types.ObjectId.isValid(organizer)) {
    return res.status(400).json({ message: 'Invalid organizer ID' });
  }

  // Validate the dates
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  if (startDate && isNaN(start)) {
    return res.status(400).json({ message: 'Invalid start date' });
  }
  if (endDate && isNaN(end)) {
    return res.status(400).json({ message: 'Invalid end date' });
  }

  try {
    // Initialize the query object
    let query = {};

    // Add parameters to the query
    if (organizer) {
      query.organizer = organizer;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: start,
        $lte: end
      };
    }

    // Safely execute the parameterized query
    const events = await Event.find(query)
      .populate('volunteers organizer')
      .exec();

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
