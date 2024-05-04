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
          backgroundImage: ` url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
           
          flexDirection: 'column',
          alignItems: 'center',
          //justifyContent: 'flex-start',
        }}
      >
      <Box sx={{display:'block' ,flexDirection:'row'}}>  
         <img
           
           src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Blue-lightning-2.png'
            style={{
              height: '100px',
              width: '100px',
              marginLeft: '100px',
              marginTop: '100px'
            }}
         />

          <Box sx={{display:'flex', flexDirection:'column', mt:'10px'}}> 
              <Typography variant='h3' sx={{color:'#de2eb8', ml:'0px', textAlign:'center', mb:'40px'}}>Please Note </Typography>
              <Typography variant='h5' sx={{color:'#ffffff', ml:'0px', textAlign:'flex-start', mb:'20px'}}>- Under 14s must be accompanied by an adult.</Typography>
              <Typography variant='h5' sx={{color:'#ffffff', ml:'0px', textAlign:'flex-start', mb:'20px'}}>- For cancellations and amendments to your booking we require 48 hours notice.</Typography>
              <Typography variant='h5' sx={{color:'#ffffff', ml:'0px', textAlign:'flex-start', mb:'10px'}}>- Under 5s go FREE! Please note: You do not need to book a space for under 5s.</Typography>
          
          </Box>

         
              <img 
              src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Pink-lightning-2.png'
                style={{
                  height: '100px',
                  width: '100px',
                  marginLeft: '800px',
                  marginTop:'90px'

                }}
              />
                <Typography 
                      variant='h4' 
                      sx={{ 
                        color: '#31cdf8', 
                        textAlign: 'center', 
                        mb: '20px', 
                        textDecoration:'underline' 
                        }}>
                          Create a new Booking
                </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', mt:'20px' }}>
              <Box sx={{ backgroundColor: '#8987874e', padding: '25px', borderRadius: '80px', width: '800px' }}>
            
                <BookingForm />
                
              </Box>
            
          </Box>
      </Box>
          <Typography variant='h4' sx={{ color: '#2db9ff', padding: '20px' }}>My Bookings</Typography>

          <Box mb={4}>
            <BookingTable loggedInUserId={userId}/>
          </Box>

        </Box>

        
      
      <Footer /> 
    </Box>
  );
};

export default Booking;
