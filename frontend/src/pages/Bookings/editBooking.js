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
    const startTimeFormatted = startTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
    axios.get(`http://localhost:3000/api/bookings/game/${editedBooking.game_name}/${editedBooking.date}/${startTimeFormatted}`)
      .then(response => {
        const existingBooking = response.data.exists;
        console.log(existingBooking)
        if (existingBooking) {
          setErrorMessage("There is already a booking for this game on the selected date.");
        } else {
          const currentDate = new Date();
          const formattedDate = moment(currentDate).format('YYYY-MM-DD');
  
          if (editedBooking.date < formattedDate) {
            setErrorMessage("You cannot create a booking for a past date.");
            return;
          }
  
          const startTimes = moment.utc(`${editedBooking.date}T${editedBooking.start_time}`);
          const durationMinutes = parseInt(editedBooking.duration, 10);
          const endTime = startTimes.clone().add(durationMinutes, 'minutes');
          const endTimeFormatted = endTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
          const editedBookingFormatted = {
            ...editedBooking,
            start_time: startTimeFormatted,
            end_time: endTimeFormatted,
          };

          
          console.log('new',editedBookingFormatted)
        
          axios.patch(`http://localhost:3000/api/bookings/${id}`, editedBookingFormatted)
            .then(response => {
              setSuccessMessage('Booking updated successfully!');
            })
            .catch(error => {
              setErrorMessage('Error updating booking. Please try again.');
            })
            .finally(() => {
              setOpenPopup(true);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching existing booking:', error);
        setErrorMessage('Error fetching existing booking. Please try again.');
      });
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
          backgroundImage: `url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
         // alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: '30px', mt:'50px', color:'#fa76d2' }}>Edit Booking Details</Typography>

        <Box sx={{display:'flex', flexDirection:'row', ml:'300px'}}> 
        <Paper style={{ padding: '30px', maxWidth: '400px'}}>
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

      <Box sx={{ml:'50px'}}> 
        <Typography variant='h4' sx={{color:'#ca9bf8', ml:'250px' , mt:'90px'}}> Rules</Typography>
        <Box sx={{display:'flex', flexDirection:'column', color:'#ffffff', mt:'10px', ml:'35px'}}>
            <Typography sx={{mb:'10px',fontSize:'1.5rem'}}> - Select the date and time that you want to change your booking.</Typography>
            <Typography sx={{mb:'10px',fontSize:'1.5rem'}}> - You cannot change the game because of the security reasons.</Typography>
            <Typography sx={{mb:'10px',fontSize:'1.5rem'}}> - If you want to change the game delete this booking & place a new booking.</Typography>
        </Box>
      </Box>
        </Box>
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