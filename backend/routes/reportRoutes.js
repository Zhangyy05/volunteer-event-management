const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Generate report based on filters (organizer and date range)
router.post('/', async (req, res) => {
  const { organizer, startDate, endDate } = req.body;

  try {
    const query = {};

    // Add organizer filter if provided
    if (organizer) {
      query.organizer = organizer;
    }

    // Add date range filter if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Fetch filtered events from the database
    const events = await Event.find(query)
      .populate('volunteers organizer');

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
