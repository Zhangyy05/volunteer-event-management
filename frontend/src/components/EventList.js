import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; 
import EditEventModal from './EditEventModal'; 

const EventList = ({ onEdit, onDelete }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);  // For tracking the event being edited
  const [isModalOpen, setIsModalOpen] = useState(false);   // Track modal open state

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Open the modal when clicking edit
  const handleEdit = (event) => {
    setEditingEvent(event);  // Set the event being edited
    setIsModalOpen(true);    // Open the modal
  };

  // Close the modal after editing is done
  const handleCloseModal = () => {
    setIsModalOpen(false);   // Close the modal
    setEditingEvent(null);   // Clear the event being edited
  };

  // Update the event in the list after successful edit
  const handleSaveEdit = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event._id === updatedEvent._id ? updatedEvent : event
    );
    setEvents(updatedEvents);  // Update the list of events
    handleCloseModal();        // Close the modal
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Event List</h2>
      {events.length === 0 ? (
        <p>No events found. Please add an event.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button className="delete" onClick={() => onDelete(event._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Render the modal if an event is selected for editing */}
      {isModalOpen && (
        <EditEventModal
          event={editingEvent}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default EventList;
