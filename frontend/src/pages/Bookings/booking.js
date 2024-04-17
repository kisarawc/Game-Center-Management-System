import React from 'react';
import BookingTable from './bookingTable';
import Box from '@mui/material/Box'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import {Typography } from '@mui/material';
import BookingForm from './CreateBookingForm'

const userId = sessionStorage.getItem('userId');
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
          <Box sx={{backgroundColor:'#ffffffa4', mt:'20px', padding:'25px', borderRadius:'80px'}}>
          <Typography variant='h4' sx={{color:'#050404', textAlign:'center', mb:'20px'}}>Create a new Booking</Typography>
          <BookingForm />
          
          </Box>
          <Typography variant='h4' sx={{color:'#ffffff', padding:'20px'}}>My Bookings</Typography>
          <Box mb={4}>
          <BookingTable loggedInUserId={userId}/>
          </Box>
        </Box>
      </Box>
      <Footer /> 
    </Box>
  );
};

export default Booking;
