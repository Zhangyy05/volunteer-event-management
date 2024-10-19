const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load models
const Volunteer = require('./models/Volunteer');
const Organizer = require('./models/Organizer');
const Event = require('./models/Event');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Mock Data
const organizers = [
  { name: 'John Doe', contactEmail: 'john.doe@example.com', phone: '123-456-7890' },
  { name: 'Jane Smith', contactEmail: 'jane.smith@example.com', phone: '098-765-4321' },
  { name: 'Alice Johnson', contactEmail: 'alice.johnson@example.com', phone: '321-654-9870' },
  { name: 'Bob Brown', contactEmail: 'bob.brown@example.com', phone: '654-321-0987' },
  { name: 'Charlie Davis', contactEmail: 'charlie.davis@example.com', phone: '789-012-3456' }
];

const volunteers = [
  { name: 'Olivia Taylor', email: 'olivia.taylor@example.com', skills: ['Teaching', 'Fundraising'], phone: '555-555-0101' },
  { name: 'Noah Wilson', email: 'noah.wilson@example.com', skills: ['Logistics', 'Event Planning'], phone: '555-555-0202' },
  { name: 'Emma Thomas', email: 'emma.thomas@example.com', skills: ['Marketing', 'Social Media'], phone: '555-555-0303' },
  { name: 'Liam White', email: 'liam.white@example.com', skills: ['Organizing', 'Public Speaking'], phone: '555-555-0404' },
  { name: 'Ava Harris', email: 'ava.harris@example.com', skills: ['Teaching', 'Event Planning'], phone: '555-555-0505' },
  { name: 'Sophia Martin', email: 'sophia.martin@example.com', skills: ['Fundraising', 'Logistics'], phone: '555-555-0606' },
  { name: 'Mason Clark', email: 'mason.clark@example.com', skills: ['Public Speaking', 'Organizing'], phone: '555-555-0707' },
  { name: 'Isabella Lewis', email: 'isabella.lewis@example.com', skills: ['Social Media', 'Marketing'], phone: '555-555-0808' },
  { name: 'Lucas Walker', email: 'lucas.walker@example.com', skills: ['Teaching', 'Logistics'], phone: '555-555-0909' },
  { name: 'Mia Young', email: 'mia.young@example.com', skills: ['Fundraising', 'Public Speaking'], phone: '555-555-1010' }
];

const events = [
  { name: 'Community Cleanup', date: '2024-11-01', location: 'Park District', duration: 4, maxVolunteers: 50 },
  { name: 'Charity Run', date: '2024-12-01', location: 'City Stadium', duration: 5, maxVolunteers: 100 },
  { name: 'Holiday Food Drive', date: '2024-12-15', location: 'Community Center', duration: 3, maxVolunteers: 40 },
  { name: 'Tree Planting', date: '2024-11-20', location: 'Central Park', duration: 6, maxVolunteers: 70 },
  { name: 'Charity Auction', date: '2024-11-10', location: 'Downtown Plaza', duration: 3, maxVolunteers: 30 }
];

// Insert data into MongoDB
const insertData = async () => {
  try {
    // Insert organizers
    await Organizer.insertMany(organizers);
    console.log('Organizers inserted');

    // Insert volunteers
    await Volunteer.insertMany(volunteers);
    console.log('Volunteers inserted');

    // Randomly assign organizers and volunteers to events
    const allOrganizers = await Organizer.find();
    const allVolunteers = await Volunteer.find();

    for (let event of events) {
      const randomOrganizer = allOrganizers[Math.floor(Math.random() * allOrganizers.length)];
      const randomVolunteers = allVolunteers.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 5); // 5-10 volunteers per event

      const newEvent = new Event({
        ...event,
        organizer: randomOrganizer._id,
        volunteers: randomVolunteers.map((v) => v._id),
        volunteerCount: randomVolunteers.length
      });

      await newEvent.save();
    }

    console.log('Events inserted');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the insertion function
insertData();
