import React, { useState } from 'react';
import ReportFilter from '../components/ReportFilter';
import ReportTable from '../components/ReportTable';
import axios from 'axios';

const ReportPage = () => {
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState({
    totalVolunteers: 0,
    avgDuration: 0,
    attendanceRate: 0,
  });

  const handleFilter = async (filterCriteria) => {
    try {
      const response = await axios.post('/api/report', filterCriteria);
      const filteredEvents = response.data;

      // Calculate statistics based on filtered events
      const totalVolunteers = filteredEvents.reduce((sum, event) => sum + event.volunteerCount, 0);
      const avgDuration = filteredEvents.reduce((sum, event) => sum + event.duration, 0) / filteredEvents.length;
      const attendanceRate =
        filteredEvents.reduce((sum, event) => sum + event.volunteerCount / event.maxVolunteers, 0) /
        filteredEvents.length;

      setEvents(filteredEvents);
      setStatistics({
        totalVolunteers,
        avgDuration: isNaN(avgDuration) ? 0 : avgDuration,
        attendanceRate: isNaN(attendanceRate) ? 0 : attendanceRate,
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Generate Event Report</h1>
      <ReportFilter onFilter={handleFilter} />
      <ReportTable events={events} statistics={statistics} />
    </div>
  );
};

export default ReportPage;
