import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Typography, TextField, Button, Grid, Snackbar } from '@mui/material';

const userId = sessionStorage.getItem('userId');

const ClientEvent = () => {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchEventsAndComments();
  }, []);

  const fetchEventsAndComments = async () => {
    try {
      const eventsResponse = await axios.get('http://localhost:3000/api/events');
      const eventsWithComments = await Promise.all(eventsResponse.data.map(async event => {
        const commentsResponse = await axios.get(`http://localhost:3000/api/events/${event._id}/comments`);
        const commentsWithUserNames = await Promise.all(commentsResponse.data.map(async comment => {
          const userResponse = await axios.get(`http://localhost:3000/api/users/${comment.userId}`);
          return { ...comment, userName: userResponse.data.name };
        }));
        return { ...event, comments: commentsWithUserNames };
      }));
      setEvents(eventsWithComments);
      const initialComments = {};
      eventsWithComments.forEach(event => {
        initialComments[event._id] = '';
        setShowMore({ ...showMore, [event._id]: false });
      });
      setComments(initialComments);
    } catch (error) {
      console.error('Error fetching events and comments:', error);
    }
  };

  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const addComment = async (eventId, userId) => {
    try {
      if (!userId) {
        console.error('User not logged in');
        return;
      }
      
      const response = await axios.post(`http://localhost:3000/api/events/${eventId}/comments`, {
        comment: comments[eventId],
        eventId,
        userId
      });
      console.log('New comment added:', response.data);
      fetchEventsAndComments();
      setComments({ ...comments, [eventId]: '' });
      setSnackbarOpen(true); // Open the snackbar to indicate comment added successfully
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const handleSeeMore = (eventId) => {
    setShowMore({ ...showMore, [eventId]: true });
  };

  const handleShowLess = (eventId) => {
    setShowMore({ ...showMore, [eventId]: false });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
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
        <TextField
  type="text"
  placeholder="Search by event title"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  fullWidth
  margin="normal"
  InputProps={{
    sx: {
      borderRadius: '25px',
      paddingRight: '0',
    },
  }}
  sx={{ width: '20%', float: 'right' }}
/>

          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {filteredEvents.map(event => (
              <Grid item xs={7} key={event._id} >
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
                  <h3>Comments</h3>
                  {event.comments.map((comment, index) => {
                    if (!showMore[event._id] && index >= 3) {
                      return null; // Hide comments beyond the third one if "See More" is not clicked
                    }
                    return (
                      <div key={comment._id}>
                        {comment.userId && (
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{comment.userName}</Typography>
                        )}
                        
                        <Typography variant="body1" color="textSecondary" gutterBottom marginLeft={5} sx={{ marginBottom: '8px' }}>
                          {comment.comment}
                        </Typography>
                      </div>
                    );
                  })}
                  {event.comments.length > 3 && (
                    <div>
                      {showMore[event._id] ? (
                        <Button onClick={() => handleShowLess(event._id)}>Show Less</Button>
                      ) : (
                        <Button onClick={() => handleSeeMore(event._id)}>See More</Button>
                      )}
                    </div>
                  )}
                  <TextField
                    type="text"
                    placeholder="Add a comment"
                    value={comments[event._id]}
                    onChange={(e) => setComments({ ...comments, [event._id]: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" onClick={() => addComment(event._id, userId)}>Submit</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleSnackbarClose}
        message="Comment added successfully"
      />
    </Box>
  );
};

export default ClientEvent;
