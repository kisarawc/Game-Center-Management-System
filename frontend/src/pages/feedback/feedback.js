import React from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box } from '@mui/material';
import Feedbackform from './feedbackform';


const feedback = () => {

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
        alignItems: 'left',
        justifyContent: 'flex-start',
        paddingX: '50px',

      }}>
        <Feedbackform />
      </Box>
      <Footer />

    </Box>
  );
};

export default feedback;