import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p className="p-4">Loading event...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 underline">← Back to Timeline</Link>
      <div className="mt-4 border rounded shadow bg-white p-4">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-sm text-gray-500">{event.date} • {event.type}</p>
        <p className="mt-2 text-gray-700">{event.description}</p>
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
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <ul className="space-y-2">
            {event.comments.map((comment, i) => (
              <li key={i} className="border p-2 rounded bg-gray-50">
                <span className="font-semibold">{comment.user}</span>: {comment.text}
              </li>
            ))}
            {event.comments.length === 0 && (
              <p className="text-gray-500">No comments yet. Be the first to add one!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
