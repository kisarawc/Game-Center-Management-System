import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import moment from 'moment';
import Box from '@mui/material/Box';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const EditBooking = () => {
  const { id } = useParams(); 

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

  const renderTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <MenuItem key={time} value={time}>{time}</MenuItem>
        );
      }
    }
    return options;
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [previousPage, setPreviousPage] = useState('');

  const formatTime = (time) => {
    const localTime = new Date(time);
    return localTime.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
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

  const handleSubmit = (id) => {
  console.log('id is',id)
    const startTime = moment.utc(`${editedBooking.date}T${editedBooking.start_time}`);
    const startTimeFormatted = startTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    console.log(startTimeFormatted)
    axios.get(`http://localhost:3000/api/bookings/game/${editedBooking.game_name}/${editedBooking.date}/${startTimeFormatted}`)
      .then(response => {
        const existingBooking = response.data;
        console.log(existingBooking)
        if (existingBooking) {
          setErrorMessage("There is already a booking for this game on the selected date.");
          return;
        } 
      }).catch(error => {
        console.error('Error creating booking:', error);
      });
          
          const currentDate = new Date();
          
          const formattedDate = moment(currentDate).format('YYYY-MM-DD');
          console.log('s',editedBooking.start_time) 

          const startTimes = moment.utc(`${editedBooking.date}T${editedBooking.start_time}`);
    
          // Parse duration from string to number
          const durationMinutes = parseInt(editedBooking.duration, 10);
          
          // Calculate end time by adding duration to start time
          const endTime = startTimes.clone().add(durationMinutes, 'minutes');
          
          // Format end time
          const endTimeFormatted = endTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
          console.log('fo',endTimeFormatted)
          if (editedBooking.date < formattedDate) {
            setErrorMessage("You cannot create a booking for a past date.");
            return;
          }
          const editedBookingFormatted = {
            ...editedBooking,
            start_time: startTimeFormatted,
            end_time: endTimeFormatted,
          };
          
          axios.patch(`http://localhost:3000/api/bookings/${id}`, editedBookingFormatted)
          .then(response => {
              setSuccessMessage('Booking updated successfully!');
          })
          .catch(error => {
              setErrorMessage('Error updating booking. Please try again.');
          })
          .finally(() => {
              setOpenPopup(!!successMessage);
          });
        
      
            setErrorMessage(''); 
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    if (successMessage) {
      window.location.href = previousPage || '/';
    }
  };

  useEffect(() => {
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
          <Typography variant="h4" sx={{ textAlign: 'center', mb: '30px' }}>Edit Booking Details</Typography>
          {errorMessage && <Typography color="error" sx={{ marginBottom: '10px' }}>{errorMessage}</Typography>}
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
            type="date"
            label="Date"
            name="date"
            value={editedBooking.date}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />

          <Select
            fullWidth
            label="Start Time"
            name="start_time"
            value={editedBooking.start_time}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          >
            {renderTimeOptions()}
          </Select>
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

          <Button variant="contained" onClick={() => handleSubmit(id)}>Update Booking</Button>
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
