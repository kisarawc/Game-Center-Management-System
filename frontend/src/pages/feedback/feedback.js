import React from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box } from '@mui/material';
import Feedbackform from './feedbackform';
import FeedbackTable from './feedbackTable';

const Feedback = [
  {
    GameName: 'videogame',
    yourReview: 'Good',
    picture: '',
    Name: 'Radee',
    Email: 'radee@gmail.com',
  },
  {
    GameName: 'game1',
    yourReview: 'Good',
    picture: '',
    Name: 'Nimu',
    Email: 'Nimu@gmail.com',
  }

];

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
        <FeedbackTable rows={feedback} />
      </Box>
      <Footer />

    </Box>
  );

};

export default feedback;