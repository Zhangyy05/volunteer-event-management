import React from 'react';

const ReportTable = ({ events, statistics }) => {
  if (events.length === 0) {
    return <p>No events found for the selected criteria.</p>;
  }

  return (
    <div>
      <h2>Event Report</h2>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Volunteers</th>
            <th>Max Volunteers</th>
            <th>Duration (hours)</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.volunteerCount}</td>
              <td>{event.maxVolunteers}</td>
              <td>{event.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Statistics</h3>
        <p>Total Volunteers: {statistics.totalVolunteers}</p>
        <p>Average Event Duration: {statistics.avgDuration} hours</p>
        <p>Average Attendance Rate: {(statistics.attendanceRate * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ReportTable;
