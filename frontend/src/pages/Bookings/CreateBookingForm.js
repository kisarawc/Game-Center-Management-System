import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper, TextField } from '@mui/material';

const BookingPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Additional state for form fields
  const [numPlayers, setNumPlayers] = useState('');
  const [messageRequest, setMessageRequest] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30); // Default duration: 30 minutes

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
          duration: booking.duration, // Insert duration field
        }));
        setBookings(formattedBookings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedDateTime = new Date(`${selectedDate}T${selectedStartTime}:00.000Z`);
    const newBooking = {
      date: selectedDateTime.toISOString().split('T')[0], // Convert date to ISO string format
      game_name: selectedGame,
      start_time: selectedDateTime.toISOString(), // Convert start time to ISO string format
      duration: selectedDuration,
      num_players: numPlayers,
      message_request: messageRequest,
      user_id: '609d97334529cd465ab5c8a0'
    };
    // Inside your component function
    console.log('Selected Game:', selectedGame);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Start Time:', selectedStartTime);
    console.log('Selected Duration:', selectedDuration);
    console.log('Number of Players:', numPlayers);
    console.log('Message Request:', messageRequest);
    axios.post('http://localhost:3000/api/bookings', newBooking)
      .then(response => {
        console.log('Booking created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  };

  // const formatTime = (time) => {
  //   return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

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
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <TableCell>Duration (minutes)</TableCell> 
      </TableRow>
    </TableHead>
    <TableBody>
    {bookings.map(booking => (
    <TableRow key={booking._id}>
      <TableCell>{booking.date}</TableCell>
      <TableCell>{booking.start_time}</TableCell>
      <TableCell>{booking.duration}</TableCell>
    </TableRow>

))}

    </TableBody>
  </Table>
) : (
  <Typography variant="body1" style={{ marginTop: '20px' }}>No bookings found for the selected game and date.</Typography>
)}

      {/* Form for creating a new booking */}
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
        <Button variant="contained" type="submit" >
          Create Booking
        </Button>
      </form>
    </Paper>
  );
};

export default BookingPage;
