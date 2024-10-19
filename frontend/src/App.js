import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function HomePage() {
  return <h2>Home - Volunteer Event Management</h2>;
}

function EventsPage() {
  return <h2>Events List</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
