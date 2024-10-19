import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import ReportPage from './pages/ReportPage';
import './styles.css';
import axios from 'axios';

// Set the base URL to the backend
axios.defaults.baseURL = 'http://localhost:5000';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
