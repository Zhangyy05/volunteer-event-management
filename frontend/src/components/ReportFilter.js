import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportFilter = ({ onFilter }) => {
  const [organizers, setOrganizers] = useState([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const res = await axios.get('/api/organizers');
        setOrganizers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrganizers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ organizer: selectedOrganizer, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Organizer:</label>
        <select value={selectedOrganizer} onChange={(e) => setSelectedOrganizer(e.target.value)}>
          <option value="">All Organizers</option>
          {organizers.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button type="submit">Generate Report</button>
    </form>
  );
};

export default ReportFilter;
