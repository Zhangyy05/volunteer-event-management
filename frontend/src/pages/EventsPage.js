import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import axios from 'axios';
import '../styles.css'; 

const EventsPage = () => {
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = async (eventId) => {
    try {
      console.log(`Attempting to delete event with ID: ${eventId}`);  
      await axios.delete(`/api/events/${eventId}`);
      console.log('Event deleted successfully');
      window.location.reload();  // Refresh the page after successful deletion
    } catch (err) {
      console.log("Error occurred during deletion");
      console.error('Axios error:', err);  
    }
  };
  

  const handleSubmit = async (eventData) => {
    try {
      if (editingEvent) {
        await axios.put(`/api/events/${editingEvent._id}`, eventData);
      } else {
        await axios.post('/api/events', eventData);
      }
      setEditingEvent(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Manage Volunteer Events</h1>
      <EventList onEdit={handleEdit} onDelete={handleDelete} />
      <EventForm onSubmit={handleSubmit} eventDetails={editingEvent} />
    </div>
  );
};

export default EventsPage;
