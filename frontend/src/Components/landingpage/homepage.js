import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme from '../../styles/theme';
import Header from '../common/Header/header';
import Footer from '../common/Footer/footer';



const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column', // Added to display items vertically
          alignItems: 'center',
          justifyContent: 'flex-start',
        
        }}
      >
        <Box  sx={{ paddingTop: '100px' }}>
          <Typography variant='h1' sx={{ textAlign: 'center' }}>

            <span style={{ color: '#f32479', fontFamily: 'Great vibes', marginRight: '20px', fontSize: '5rem' }}>The</span>
            <span style={{ color: '#14e9f2', fontFamily: 'Robofan Free, sans-serif', textShadow: '0 0 10px', marginRight: '20px' }}>GG</span>
            <span style={{ color: '#f32479', fontFamily: 'Robofan Free, sans-serif', textShadow: '0 0 10px' }}>Lounge</span>
          </Typography>
        </Box>
        <Box sx={{maxWidth:'800px', textAlign:'center'}}>
          <Typography sx={{fontSize:'1.2rem'}}>
            <br />
            A game center is a vibrant hub where gamers of all ages and backgrounds come together to immerse themselves in the excitement
            of interactive entertainment. From classic arcade machines to cutting-edge virtual reality experiences, game centers offer a
            diverse range of activities to cater to every gaming preference. Whether you're a casual player looking to unwind with friends
            or a competitive gamer seeking thrilling challenges, game centers provide a welcoming environment filled with the latest
            technology and gaming innovations. With a lively atmosphere buzzing with laughter and friendly competition, game centers foster
            a sense of community among enthusiasts, making them the go-to destination for unforgettable gaming adventures.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default HomePage;
