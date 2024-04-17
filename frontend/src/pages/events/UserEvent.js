import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Typography, TextField, Button, Grid, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ClientEvent = () => {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    fetchEventsAndComments();
  }, []); // Fetch events and comments when component mounts

  const fetchEventsAndComments = async () => {
    try {
      const eventsResponse = await axios.get('http://localhost:5000/api/events');
      const eventsWithComments = await Promise.all(eventsResponse.data.map(async event => {
        const commentsResponse = await axios.get(`http://localhost:5000/api/events/${event._id}/comments`);
        return { ...event, comments: commentsResponse.data };
      }));
      setEvents(eventsWithComments);
      // Initialize comment state with empty strings for each event
      const initialComments = {};
      eventsWithComments.forEach(event => {
        initialComments[event._id] = '';
      });
      setComments(initialComments);
    } catch (error) {
      console.error('Error fetching events and comments:', error);
    }
  };

  // Function to filter events based on search query
  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Function to add a comment
  const addComment = async (eventId, userId) => {
    try {
      // Check if a user is logged in
      if (!userId) {
        console.error('User not logged in');
        return;
      }
      
      const response = await axios.post(`http://localhost:5000/api/events/${eventId}/comments`, {
        comment: comments[eventId],
        eventId,
        userId // Pass the userId to the server
      });
      console.log('New comment added:', response.data);
      // After adding a new comment, refetch the events to update the list
      fetchEventsAndComments();
      // Clear the input field for this event
      setComments({ ...comments, [eventId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <div>
          {/* Search bar */}
          <TextField
            type="text"
            placeholder="Search by event title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: '25px', // Rounded corners
                paddingRight: '0', // Remove default padding
              },
            }}
            sx={{ width: '25%', float: 'right' }} // Adjusting the width and alignment of the search bar
          />
          {/* Event cards */}
          <Grid container spacing={2}>
            {filteredEvents.map(event => (
              <Grid item xs={12} key={event._id}>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h5" component="div" gutterBottom>
                    {event.title}
                  </Typography>
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                    <img
                      src={event.imagePath}
                      alt={event.title}
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  </div>
                  <Typography variant="body1" gutterBottom>
                    Date: {formatDate(event.date)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Description: {event.description}
                  </Typography>
                  {/* Display comments for this event */}
                  <h3>Comments</h3>
{event.comments.map(comment => (
  <div key={comment._id} style={{ marginBottom: '10px' }}>
    <Typography variant="body2" color="primary" style={{ fontWeight: 'bold' }}>{comment.userId.name}</Typography>
    <Typography variant="body1" gutterBottom style={{ marginLeft: '10px' }}>{comment.comment}</Typography>
  </div>
))}
                  {/* Input field and submit button for adding comments */}
                  <TextField
                    type="text"
                    placeholder="Add a comment"
                    value={comments[event._id]}
                    onChange={(e) => setComments({ ...comments, [event._id]: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" onClick={() => addComment(event._id, '66181e723c2dc6dc00c58a05')}>Submit</Button>
                  {/* Pass the user ID to the addComment function */}
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default ClientEvent;