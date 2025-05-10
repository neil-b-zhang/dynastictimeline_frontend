import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline';
import AdminPanel from './pages/AdminPanel';
import EventDetail from './pages/EventDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}