import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBookings from './FilterBookings';
import CreateBooking from './CreateBookingForm';
import ViewMyBookings from './ViewMyBookings';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Container, Paper } from '@mui/material';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch current bookings
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('/api/bookings')
      .then(response => {
        setBookings(response.data.data.bookings);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  };

  const handleFilter = (selectedGame, selectedDate) => {
    axios.get(`/api/bookings?game=${selectedGame}&date=${selectedDate}`)
      .then(response => {
        setBookings(response.data.data.bookings);
      })
      .catch(error => {
        console.error('Error filtering bookings:', error);
      });
  };

  const handleCreateBooking = (newBookingData) => {
    axios.post('/api/bookings', newBookingData)
      .then(response => {
        fetchBookings(); // Refresh bookings after creating a new one
      })
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  };

  const handleViewMyBookings = () => {
    axios.get('/api/my-bookings')
      .then(response => {
        setBookings(response.data.data.bookings);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
      });
  };

  return (
    <Box>
    <Header />
       <Box sx={{ 
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        
         }}>
    <Container component={Paper} sx={{ p: 3, mt: 3, mb: 3, width: '90%' }}>
          {/* Filter Section */}
          <FilterBookings onFilter={handleFilter} />

          {/* Create Booking Section */}
          <CreateBooking onCreateBooking={handleCreateBooking} />

          {/* View My Bookings Section */}
          <ViewMyBookings onViewMyBookings={handleViewMyBookings} />

          {/* Display current bookings */}
          {/* You can display the current bookings here */}
        </Container>
    </Box>
      <Footer />
    </Box>
  );
};

export default Booking;
