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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
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
          end_time: formatTime(booking.end_time)
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
    // Implement form submission logic here
    // You can use axios.post() to send a POST request to your backend to create a new booking
    console.log('Form submitted');
    console.log('Selected Game:', selectedGame);
    console.log('Selected Date:', selectedDate);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Number of Players:', numPlayers);
    console.log('Message Request:', messageRequest);
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
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking._id}>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.start_time}</TableCell>
                <TableCell>{booking.end_time}</TableCell>
                {/* Add more table cells for other booking details */}
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
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          style={{ marginBottom: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          fullWidth
          label="End Time"
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          style={{ marginBottom: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
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
        <Button variant="contained" type="submit">
          Create Booking
        </Button>
      </form>
    </Paper>
  );
};

export default BookingPage;
