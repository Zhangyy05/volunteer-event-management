import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; 

const EventForm = ({ onSubmit, eventDetails }) => {
  const [name, setName] = useState(eventDetails?.name || '');
  const [date, setDate] = useState(eventDetails?.date || '');
  const [location, setLocation] = useState(eventDetails?.location || '');
  const [duration, setDuration] = useState(eventDetails?.duration || '');
  const [maxVolunteers, setMaxVolunteers] = useState(eventDetails?.maxVolunteers || '');

  const [selectedOrganizer, setSelectedOrganizer] = useState(eventDetails?.organizer || '');
  const [organizerList, setOrganizerList] = useState([]);

  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState(eventDetails?.volunteers || []);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const res = await axios.get('/api/organizers');
        setOrganizerList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchVolunteers = async () => {
      try {
        const res = await axios.get('/api/volunteers');
        setVolunteers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrganizers();
    fetchVolunteers();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      name,
      date,
      location,
      duration,
      maxVolunteers,
      organizer: selectedOrganizer,
      volunteers: selectedVolunteers,
    };
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Event Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Duration (hours):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>
      <div>
        <label>Max Volunteers:</label>
        <input type="number" value={maxVolunteers} onChange={(e) => setMaxVolunteers(e.target.value)} required />
      </div>
      <div>
        <label>Organizer:</label>
        <select value={selectedOrganizer} onChange={(e) => setSelectedOrganizer(e.target.value)} required>
          <option value="">Select Organizer</option>
          {organizerList.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Volunteers:</label>
        <div className="checkbox-list">
          {volunteers.map((vol) => (
            <div key={vol._id}>
              <input
                type="checkbox"
                value={vol._id}
                checked={selectedVolunteers.includes(vol._id)}
                onChange={(e) => {
                  const volId = e.target.value;
                  if (selectedVolunteers.includes(volId)) {
                    setSelectedVolunteers(selectedVolunteers.filter((v) => v !== volId));
                  } else {
                    setSelectedVolunteers([...selectedVolunteers, volId]);
                  }
                }}
              />
              {vol.name}
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
