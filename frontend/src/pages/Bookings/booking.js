import React from 'react';
import BookingTable from './bookingTable';
import Box from '@mui/material/Box'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Typography } from '@mui/material';
import BookingForm from './CreateBookingForm';

const userId = sessionStorage.getItem('userId');

const Booking = () => {
  return (
    <Box>
      <Header /> 
      <Box
        sx={{
          backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-4480x2520-8324.png')`,
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', mt:'10px' }}>
            <Box sx={{ backgroundColor: '#4b4b4ba4', padding: '25px', borderRadius: '80px', width: '800px' }}>
              <Typography variant='h4' sx={{ color: '#ffffff', textAlign: 'center', mb: '20px' }}>Create a new Booking</Typography>
              <BookingForm />
            </Box>
            
          </Box>
          <Typography variant='h4' sx={{ color: '#ffffff', padding: '20px' }}>My Bookings</Typography>
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
