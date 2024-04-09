import React from 'react';
import BookingTable from './bookingTable';
import Box from '@mui/material/Box'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Typography } from '@mui/material';

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
        <div>
          <Typography variant='h4' sx={{color:'#ffffff'}}>My Bookings</Typography>
          <BookingTable />
        </div>
      </Box>
      <Footer /> 
    </Box>
  );
};

export default Booking;
