import React from 'react';

const ReportTable = ({ reportData }) => {
  if (!reportData || reportData.length === 0) {
    return <div>No report data available</div>;
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
          </tr>
        </thead>
        <tbody>
          {reportData.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.volunteerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
