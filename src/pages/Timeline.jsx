// pages/Timeline.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const typeStyles = {
  TRADE: "bg-blue-100 text-blue-700",
  ANNOUNCEMENT: "bg-gray-100 text-gray-700",
  "BOLD PREDICTION": "bg-yellow-100 text-yellow-800"
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Dynasty Fantasy Football Timeline</h1>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border rounded shadow bg-white">
            <div className="p-4">
              <div className={`inline-block px-2 py-1 text-xs font-bold rounded ${typeStyles[event.type] || 'bg-gray-200 text-gray-800'}`}>{event.type}</div>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
              <h2 className="text-lg font-semibold mt-2">
                <Link to={`/event/${event.id}`} className="hover:underline text-blue-600">
                  {event.title}
                </Link>
              </h2>
              <p className="text-sm mt-1 text-gray-700">{event.description}</p>
              {event.media?.type === 'image' && (
                <img src={event.media.url} alt="event visual" className="mt-3 rounded w-full object-cover" />
              )}
              {event.media?.type === 'link' && (
                <a href={event.media.url} target="_blank" rel="noopener noreferrer" className="block text-blue-500 mt-3 underline">
                  View Related Content
                </a>
              )}
              {event.media?.type === 'embed' && (
                <div className="mt-3">
                  <iframe src={event.media.url} className="w-full aspect-video rounded" allowFullScreen title="Embedded media"></iframe>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
