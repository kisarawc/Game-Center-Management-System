// Event.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Event = () => {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', imagePath: '' });
  const [events, setEvents] = useState([]);
  const [editEventIds, setEditEventIds] = useState({});

  // State to store comments for each event
  const [comments, setComments] = useState({});

  // Function to fetch events and comments
  const fetchEventsAndComments = async () => {
    try {
      const eventsResponse = await axios.get('http://localhost:5000/api/events');
      const eventsWithComments = await Promise.all(eventsResponse.data.map(async event => {
        const commentsResponse = await axios.get(`http://localhost:5000/api/events/${event._id}/comments`);
        return { ...event, comments: commentsResponse.data };
      }));
      setEvents(eventsWithComments);
    } catch (error) {
      console.error('Error fetching events and comments:', error);
    }
  };

  useEffect(() => {
    fetchEventsAndComments();
  }, []); // Fetch events and comments when component mounts

  const createEvent = async () => {
    try {
      const eventResponse = await axios.post('http://localhost:5000/api/events', newEvent);
      console.log('New event created:', eventResponse.data);
      // After creating a new event, refetch the events and comments to update the list
      fetchEventsAndComments();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const addComment = async (eventId) => {
    try {
      const commentText = comments[eventId];
      const response = await axios.post(`http://localhost:5000/api/events/${eventId}/comments`, { comment: commentText, eventId });
      console.log('New comment added:', response.data);
      // After adding a new comment, refetch the events and comments to update the list
      fetchEventsAndComments();
      // Clear the comment input field for this event
      setComments({ ...comments, [eventId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      // Filter out the deleted event from the events state
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const updateEvent = async (eventId) => {
    try {
      const updatedEvent = editEventIds[eventId];
      const response = await axios.put(`http://localhost:5000/api/events/${eventId}`, updatedEvent);
      console.log('Event updated:', response.data);
      // Refetch the events and comments to update the list
      fetchEventsAndComments();
      // Clear the edit state for this event
      setEditEventIds({ ...editEventIds, [eventId]: null });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h3>Create New Event</h3>
      {/* Input fields for creating a new event */}
      <input
        type="text"
        value={newEvent.title}
        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
        placeholder="Event Title"
      />
      <textarea
        value={newEvent.description}
        onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        placeholder="Event Description"
      />
      <input
        type="date"
        value={newEvent.date}
        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
      />
      <input
        type="text"
        value={newEvent.imagePath}
        onChange={e => setNewEvent({ ...newEvent, imagePath: e.target.value })}
        placeholder="Image URL"
      />
      <button onClick={createEvent}>Create Event</button>

      <div>
        <h3>Events</h3>
        <ul>
          {events.map(event => (
            <li key={event._id}>
              {/* Display event details */}
              {editEventIds[event._id] ? (
                <div>
                  {/* Update form */}
                  <input
                    type="text"
                    value={editEventIds[event._id].title}
                    onChange={e => setEditEventIds({ ...editEventIds, [event._id]: { ...editEventIds[event._id], title: e.target.value } })}
                    placeholder="Event Title"
                  />
                  <textarea
                    value={editEventIds[event._id].description}
                    onChange={e => setEditEventIds({ ...editEventIds, [event._id]: { ...editEventIds[event._id], description: e.target.value } })}
                    placeholder="Event Description"
                  />
                  <input
                    type="date"
                    value={editEventIds[event._id].date}
                    onChange={e => setEditEventIds({ ...editEventIds, [event._id]: { ...editEventIds[event._id], date: e.target.value } })}
                  />
                  <input
                    type="text"
                    value={editEventIds[event._id].imagePath}
                    onChange={e => setEditEventIds({ ...editEventIds, [event._id]: { ...editEventIds[event._id], imagePath: e.target.value } })}
                    placeholder="Image URL"
                  />
                  <button onClick={() => updateEvent(event._id)}>Update</button>
                </div>
              ) : (
                <div>
                  {/* Display event details */}
                  {event.title} - {event.description} - {event.date}
                  <button onClick={() => deleteEvent(event._id)}>Delete</button>
                  <button onClick={() => setEditEventIds({ ...editEventIds, [event._id]: { ...event } })}>Edit</button>
                </div>
              )}
              <ul>
                {/* Display comments for this event */}
                {event.comments.map(comment => (
                  <li key={comment._id}>{comment.comment}</li>
                ))}
              </ul>
              {/* Input field for adding comments */}
              <input
                type="text"
                value={comments[event._id] || ''}
                onChange={e => setComments({ ...comments, [event._id]: e.target.value })}
                placeholder="Add a comment"
              />
              {/* Button to add comment */}
              <button onClick={() => addComment(event._id)}>Add Comment</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Event;
