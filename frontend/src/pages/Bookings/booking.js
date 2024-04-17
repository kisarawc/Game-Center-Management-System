import React from 'react';
import BookingTable from './bookingTable';
import Box from '@mui/material/Box'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import {Typography } from '@mui/material';
import BookingForm from './CreateBookingForm'

const Booking = () => {
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
        <Box>
          <Box sx={{backgroundColor:'#ffffffa4', mt:'10px'}}>
          <Typography variant='h4' sx={{color:'#050404', textAlign:'center'}}>Create a new Booking</Typography>
          <BookingForm />
          
          </Box>
          <Typography variant='h4' sx={{color:'#ffffff'}}>My Bookings</Typography>
          <BookingTable loggedInUserId={'609d97334529cd465ab5c8a0'}/>
        </Box>
      </Box>
      <Footer /> 
    </Box>
  );
};

export default Booking;
