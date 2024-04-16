import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper, TextField, Modal } from '@mui/material';

const BookingPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingCreated,setBookingCreated] = useState(false);
  const [openModal, setOpenModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  // Additional state for form fields
  const [numPlayers, setNumPlayers] = useState('');
  const [messageRequest, setMessageRequest] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);

  useEffect(() => {
    // Fetch game names when the component mounts
    axios.get('http://localhost:3000/api/game/names')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching game names:', error);
      });
  }, []);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setSelectedStartTime(event.target.value);
  };

  const handleSubmit = () => {
    // Clear previous bookings
    setBookings([]);
    setLoading(true);
    // Fetch bookings for the selected game and date
    axios.get(`http://localhost:3000/api/bookings/game/${selectedGame}/${selectedDate}`)
      .then(response => {
        const formattedBookings = response.data.map(booking => ({
          ...booking,
          date: formatDate(booking.date),
          start_time: formatTime(booking.start_time),
          end_time: formatTime(booking.end_time), 
        }));
        setBookings(formattedBookings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);

      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedStartTime}`);
  
    if (selectedDateTime < currentDate) {
      setErrorMessage("You cannot create a booking for a past date.");
      return;
    }

    if (numPlayers <= 0) {
      setErrorMessage("Please enter a valid number of players.");
      return;
    }

    setErrorMessage(''); 
    


    // Convert selectedStartTime to a Date object
    const startTimeParts = selectedStartTime.split(':');
    const selectedTime = new Date();
    selectedTime.setHours(parseInt(startTimeParts[0], 10));
    selectedTime.setMinutes(parseInt(startTimeParts[1], 10));

    // Add duration to selected start time
    const selectedEndTime = new Date(selectedTime.getTime() + selectedDuration * 60000);

    // Format selectedEndTime as "HH:mm"
    const endHours = selectedEndTime.getHours().toString().padStart(2, '0');
    const endMinutes = selectedEndTime.getMinutes().toString().padStart(2, '0');
    const formattedEndTime = new Date(`${selectedDate}T${endHours}:${endMinutes}`);


    //console.log('End Time:', formattedEndTime);
    const timezoneOffset = selectedDateTime.getTimezoneOffset();
    const selectedDateTimeEnd = new Date(formattedEndTime.getTime()- timezoneOffset * 60000);

    const existingBookingWithStartTime = bookings.some(booking => {
        const bookingStartTime = booking.start_time;
        const bookingEndTime = booking.end_time;
        //const moment = require('moment');
        // // Parse the date string into a moment object
        // const momentDate = moment.utc(bookingEndTime);

        // // Get the formatted time in the UTC time zone
        // const formattedTime = momentDate.format('HH:mm');

        console.log('bt', bookingStartTime);
        console.log('be', bookingEndTime);
        console.log('st', selectedStartTime);

        if (selectedStartTime >= bookingStartTime && 
          selectedStartTime < bookingEndTime) {
          return true; 
      } return false; 
});
if(existingBookingWithStartTime) {
  console.log('Double booking found!');
} else {
  console.log('No double booking found.');
}
    if (existingBookingWithStartTime) {
      setErrorMessage("There's already a booking at the selected start time.");
      return;
    }
 
    const selectedDateTimeLocal = new Date(selectedDateTime.getTime() - timezoneOffset * 60000);
    
    //console.log('et',selectedDateTimeEnd)
    const newBooking = {
      date: selectedDateTimeLocal.toISOString().split('T')[0], // Convert date to ISO string format
      game_name: selectedGame,
      start_time: selectedDateTimeLocal.toISOString(), // Convert start time to ISO string format
      end_time: selectedDateTimeEnd.toISOString(),
      duration: selectedDuration,
      num_players: numPlayers,
      status: 'pending',
      message_request: messageRequest,
      user_id: '609d97334529cd465ab5c8a0'
    };

    axios.post('http://localhost:3000/api/bookings', newBooking)
      .then(response => {
        console.log('Booking created successfully:', response.data);
        setBookingCreated(true); 
        setOpenModal(true); 
      })
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  };

  const handlePaymentNow = () => {
    window.location.href = '/payment'; 
  };

  const handlePaymentLater = () => {
    setBookingCreated(false); 
    setOpenModal(false);
    setSelectedGame('');
    setSelectedDate('');
    setSelectedStartTime('');
    setNumPlayers('');
    setMessageRequest('');
    setLoading(false);
    setBookings([]);
    window.location.reload(); 
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

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

  const formatTime = (time) => {
    const localTime = new Date(time);
    return localTime.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Select Game & Date</Typography>
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel>Select a game</InputLabel>
        <Select value={selectedGame} onChange={handleGameChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {games.map(game => (
            <MenuItem key={game._id} value={game.name}>{game.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="date"
        label="Select a date"
        value={selectedDate}
        onChange={handleDateChange}
        style={{ marginBottom: '10px' }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            fontSize: 'inherit',
          },
        }}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!selectedGame || !selectedDate || loading}>
        {loading ? 'Loading...' : 'Submit'}
      </Button>

      {bookings.length > 0 ? (
        <Table style={{ marginTop: '20px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.start_time}</TableCell>
                <TableCell>{booking.end_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" style={{ marginTop: '20px' }}>No bookings found for the selected game and date.</Typography>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Booking created successfully!
          </Typography>
          <Button variant="contained" onClick={handlePaymentNow} style={{ marginRight: '10px' }}>
            Do the Payment Now
          </Button>
          <Button variant="contained" onClick={handlePaymentLater}>
            Do the Payment Later
          </Button>
        </Paper>
      </Modal>

      {errorMessage && (
        <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>Create New Booking</Typography>
        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Select Start Time</InputLabel>
          <Select
            value={selectedStartTime}
            onChange={handleStartTimeChange}
          >
            {renderTimeOptions()}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Select Duration (minutes)</InputLabel>
          <Select
            value={selectedDuration}
            onChange={(event) => setSelectedDuration(event.target.value)}
          >
            {[30, 60, 90, 120].map(duration => (
              <MenuItem key={duration} value={duration}>{duration} minutes</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Number of Players"
          type="number"
          value={numPlayers}
          onChange={(event) => setNumPlayers(event.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          fullWidth
          label="Message Request"
          multiline
          rows={4}
          value={messageRequest}
          onChange={(event) => setMessageRequest(event.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" type="submit" disabled={!selectedGame || !selectedDate || !selectedStartTime || !numPlayers} >
          Create Booking
        </Button>
      </form>
    </Paper>
  );
};

export default BookingPage;
