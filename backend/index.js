const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/report', reportRoutes);

// MongoDB connection and index creation
const initializeServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    const Event = require('./models/Event');

    // Create the compound index on organizer and date
    await Event.collection.createIndex({ organizer: 1, date: 1 });
    console.log('Index on organizer and date created successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB or creating index:', err);
    process.exit(1); 
  }
};

const PORT = process.env.PORT || 5000;

// Start the server
initializeServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
