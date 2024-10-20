import React, { useState, useEffect } from 'react';
import '../styles.css'; 
import axios from 'axios';

const EditEventModal = ({ event, onClose, onSave }) => {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date.split('T')[0]); // Convert to yyyy-mm-dd format
  const [location, setLocation] = useState(event.location);
  const [duration, setDuration] = useState(event.duration);
  const [maxVolunteers, setMaxVolunteers] = useState(event.maxVolunteers);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      name,
      date,
      location,
      duration,
      maxVolunteers,
    };

    try {
      const res = await axios.put(`/api/events/${event._id}`, updatedEvent);
      onSave(res.data);  // Pass the updated event to parent component
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Event</h2>
        <form onSubmit={handleSave}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Duration (hours):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Max Volunteers:</label>
            <input
              type="number"
              value={maxVolunteers}
              onChange={(e) => setMaxVolunteers(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
