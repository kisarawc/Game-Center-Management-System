import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorPopup from './ErrorPopup'; 
import { FormControl, InputLabel, MenuItem, Select, Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper, TextField, Modal, InputAdornment, Box } from '@mui/material';
const userId = sessionStorage.getItem('userId');

const BookingPage = () => {
  
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingCreated,setBookingCreated] = useState(false);
  const [openModal, setOpenModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [numPlayers, setNumPlayers] = useState('');
  const [messageRequest, setMessageRequest] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
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
    setBookings([]);
    setLoading(true);
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

      axios.get(`http://localhost:3000/api/game/rate/${selectedGame}`)
    .then(response => {
      const rate = response.data.hourly_rate;
      setHourlyRate(rate);
    
      console.log('Hourly rate:', rate);

    })
    .catch(error => {
      console.error('Error fetching hourly rate:', error);
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
      setShowErrorPopup(true);
      return;
    }

    if (numPlayers <= 0) {
      setErrorMessage("Please enter a valid number of players.");
      setShowErrorPopup(true);
      return;
    }

    setErrorMessage(''); 
    


    const startTimeParts = selectedStartTime.split(':');
    const selectedTime = new Date();
    selectedTime.setHours(parseInt(startTimeParts[0], 10));
    selectedTime.setMinutes(parseInt(startTimeParts[1], 10));

    const selectedEndTime = new Date(selectedTime.getTime() + selectedDuration * 60000);

    const endHours = selectedEndTime.getHours().toString().padStart(2, '0');
    const endMinutes = selectedEndTime.getMinutes().toString().padStart(2, '0');
    const formattedEndTime = new Date(`${selectedDate}T${endHours}:${endMinutes}`);


    const timezoneOffset = selectedDateTime.getTimezoneOffset();
    const selectedDateTimeEnd = new Date(formattedEndTime.getTime()- timezoneOffset * 60000);

    const moment = require('moment');

    const selectedStartTimeMoment = moment.utc(selectedStartTime, 'HH:mm'); // Parse with 24-hour format

    const existingBookingWithStartTime = bookings.some(booking => {
      const bookingStartTime = moment.utc(booking.start_time, 'HH:mm');
      const bookingEndTime = moment.utc(booking.end_time, 'HH:mm');
    
      console.log('bt', bookingStartTime.format('HH:mm')); // bt in 24-hour format
      console.log('be', bookingEndTime.format('HH:mm'));   // be in 24-hour format
      console.log('st', selectedStartTimeMoment.format('hh:mm')); // st in 24-hour format
    
      const selectedTime = selectedStartTimeMoment.format('hh:mm');
    
      if (
        selectedTime >= bookingStartTime.format('HH:mm') && 
        selectedTime < bookingEndTime.format('HH:mm')
      ) {
        return true; // There's a conflicting booking
      }
      
    
  return false; // No conflict
});

    
    


if(existingBookingWithStartTime) {
  console.log('Double booking found!');
} else {
  console.log('No double booking found.');
}
    if (existingBookingWithStartTime) {
      setErrorMessage("There's already a booking at the selected start time.");
      setShowErrorPopup(true);
      return;
    }
 
    const selectedDateTimeLocal = new Date(selectedDateTime.getTime() - timezoneOffset * 60000);
    
    //console.log('et',selectedDateTimeEnd)
    const newBooking = {
      date: selectedDateTimeLocal.toISOString().split('T')[0], 
      game_name: selectedGame,
      start_time: selectedDateTimeLocal.toISOString(), 
      end_time: selectedDateTimeEnd.toISOString(),
      duration: selectedDuration,
      num_players: numPlayers,
      status: 'pending',
      message_request: messageRequest,
      user_id: userId,
      fee: totalCost,
    };
    console.log(newBooking)
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

  useEffect(() => {
    if(selectedDuration && hourlyRate) {
      const cost = (selectedDuration / 60) * hourlyRate;
      setTotalCost(cost);
    }
  }, [selectedDuration, hourlyRate]);

  return (
    <Box >
    <Paper style={{ padding: '40px', maxWidth: '600px', margin: 'auto', borderRadius:'40px' , backgroundColor:'#f4efefff', boxShadow:'0px 4px 8px 8px  rgba(224,139,236,0.4)'}}>
      <Typography variant="h5" sx={{color:'#9574f0'}} gutterBottom>Select Game & Date</Typography>
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
      <Button variant="contained" sx= {{backgroundColor:'#b83394'}} onClick={handleSubmit} disabled={!selectedGame || !selectedDate || loading}>
        {loading ? 'Loading...' : 'Check Availability'}
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
        sx={{
          backgroundImage: `url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          width: '50%',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //justifyContent: 'center',
          padding: '20px',
        }}
      >

          <img 
            src='https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.png'
            style={{
              height:'80px',
              marginTop:'50px'
            }}
          />
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#7efefa', mt:'30px', mb:'20px'}}>
              Booking created successfully!
              </Typography>
          <Box sx={{display:'flex', flexDirection:'row'}}>
          <Button variant="contained" onClick={handlePaymentNow} sx={{fontSize:'15px',mr:'10px'}}>
            Do the Payment Now
          </Button>
          <Button variant="contained" onClick={handlePaymentLater} sx={{fontSize:'15px'}}>
            Do the Payment Later
          </Button>
          </Box>
      </Box>
      </Modal>

      {errorMessage && (
        <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
        <Typography variant="h5" sx={{color:'#9574f0'}} gutterBottom>Create New Booking</Typography>
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

        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <TextField
            label="Hourly Rate"
            value={hourlyRate}
            disabled
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs </InputAdornment>,
            }}
          />
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <TextField
            label="Total Cost"
            value={totalCost}
            disabled
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs </InputAdornment>,
            }}
          />
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
        <Button variant="contained" type="submit" sx={{ml:'230px', backgroundColor:'#08a480'}}disabled={!selectedGame || !selectedDate || !selectedStartTime || !numPlayers} >
          Book The Session
        </Button>
      </form>
    </Paper>
    <ErrorPopup 
        open={showErrorPopup} 
        message={errorMessage} 
        onClose={() => setShowErrorPopup(false)} 
      />
    </Box>
  );
};

export default BookingPage;
