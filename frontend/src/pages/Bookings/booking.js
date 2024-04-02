import React from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box } from '@mui/material';
import BookingForm from './bookigForm';
const Book = () => {
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

            <BookingForm />
        
          
          </Box>
      <Footer />
    </Box>
  );
}

export default Book;
