import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function AdminPanel() {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    type: 'TRADE',
    description: '',
    mediaType: '',
    mediaUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      alert('Event submitted successfully!');
      console.log(data);
    } catch (err) {
      console.error('Failed to submit event:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={event.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="type" value={event.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="TRADE">TRADE</option>
          <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
          <option value="BOLD PREDICTION">BOLD PREDICTION</option>
        </select>
        <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows="4" required></textarea>
        <select name="mediaType" value={event.mediaType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">No Media</option>
          <option value="image">Image</option>
          <option value="link">Link</option>
          <option value="embed">Embed</option>
        </select>
        {event.mediaType && (
          <input name="mediaUrl" value={event.mediaUrl} onChange={handleChange} placeholder="Media URL" className="w-full p-2 border rounded" />
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Event</button>
      </form>
    </div>
  );
}