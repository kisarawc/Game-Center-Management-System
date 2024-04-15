import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import moment from 'moment';
import Box from '@mui/material/Box';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const EditBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL params

  const [booking, setBooking] = useState(null);
  const [editedBooking, setEditedBooking] = useState({
    // Initial state for edited booking fields
    date: '',
    start_time: '',
    duration: '',
    message_request: '',
    num_players: '',
    game_name: '',
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [previousPage, setPreviousPage] = useState('');

  const formatTime = (time) => {
    const localTime = new Date(time);
    return localTime.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/bookings/${id}`)
      .then(response => {
        const bookingData = response.data.data.booking;
        const formattedDate = moment(bookingData.date).format('YYYY-MM-DD');


        setBooking(bookingData);
        setEditedBooking({
          ...editedBooking,
          date: formattedDate,
          start_time: formatTime(bookingData.start_time),
          duration: bookingData.duration,
          message_request: bookingData.message_request,
          num_players: bookingData.num_players,
          game_name: bookingData.game_name,
        });
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const startTime = moment.utc(`${editedBooking.date}T${editedBooking.start_time}`);

    // Format the start time as UTC
    const startTimeFormatted = startTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const editedBookingFormatted = {
    ...editedBooking,
    start_time: startTimeFormatted,
  };
    axios.patch(`http://localhost:3000/api/bookings/${id}`, editedBookingFormatted)
      .then(response => {
        setSuccessMessage('Booking updated successfully!');
        setOpenPopup(true);
      })
      .catch(error => {
        setErrorMessage('Error updating booking. Please try again.');
        setOpenPopup(true);
      });
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    if (successMessage) {
      window.location.href = previousPage || '/';
    }
  };

  useEffect(() => {
    // Save the previous page URL when the component mounts
    setPreviousPage(document.referrer);
  }, []);

  if (!booking) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Paper style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
          <Typography variant="h4" sx={{textAlign:'center', mb:'30px'}}>Edit Booking Details</Typography>
          <TextField
            fullWidth
            label="Game Name"
            name="game_name"
            value={editedBooking.game_name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            disabled
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            value={editedBooking.date}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            disabled
          />
          <TextField
            fullWidth
            label="Start Time"
            name="start_time"
            value={editedBooking.start_time}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            disabled
          />
          <TextField
            fullWidth
            label="Duration (minutes)"
            name="duration"
            value={editedBooking.duration}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            disabled
          />
          <TextField
            fullWidth
            label="Message Request"
            name="message_request"
            value={editedBooking.message_request}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Number of Players"
            name="num_players"
            type="number"
            value={editedBooking.num_players}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" onClick={handleSubmit}>Update Booking</Button>
        </Paper>
      </Box>
      <Footer />
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>{successMessage ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <Typography>{successMessage || errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBooking;