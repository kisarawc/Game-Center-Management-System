import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../common/Header/header';
import Footer from '../common/Footer/footer';
import { useTransition, animated } from 'react-spring';

const images = [
  "https://cdn.nivoli.com/adventuregamers/images/screenshots/21410/11468beyond_-_key_art_1.jpg",
  "https://m.media-amazon.com/images/M/MV5BZTliZGM2NzUtYjQ0My00YWM4LTg1NjUtYTNjMzFkNzczYTAxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
  "https://m.media-amazon.com/images/I/61fw7I5VRRL._AC_UF1000,1000_QL80_.jpg",
  "https://th.bing.com/th/id/OIF.DXI1Lliuw9QCcyQdr8hz2g?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/R.61755b3d7bad29b696c6259a9555b994?rik=HpUqmQ%2bFFr3Drw&pid=ImgRaw&r=0",
  "https://th.bing.com/th/id/OIP.KgwvWCXf9N_n6SDlEHbI9gDHEs?rs=1&pid=ImgDetMain"
];

const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 3) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const transitions = useTransition(images.slice(index, index + 3), {
    from: { opacity: 0, transform: 'scale(0.98)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 2000 },
  });

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
          justifyContent: 'flex-start',
          padding: '20px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            color: '#f32479',
            fontFamily: 'Great vibes',
            marginBottom: '20px',
            fontSize: '5rem',
          }}
        >
          The <span style={{ color: '#14e9f2', fontFamily: 'Roboto', textShadow: '0 0 10px' }}>GG</span> Lounge
        </Typography>

        <Typography variant="h2" sx={{ color: 'white', fontSize: '2rem', marginBottom: '20px', marginLeft: '240px' }}>
          New Arrival Games
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {transitions((style, item) => (
            <animated.img
              style={{ ...style, width: '300px', margin: '20px' }}
              src={item}
              alt="Game"
            />
          ))}
        </Box>

        {/* <Typography variant='h2' sx={{color:'#ffffff',fontSize:'2rem', textAlign:'center', mt:'50px', textDecoration: 'underline', textDecorationThickness: '0.2em',}}>Established in 2019</Typography> */}
        <Typography variant='h5' sx={{color:'purple', textAlign:'center',fontSize:'1.7rem',mt:'20px', ml:'300px', mr:'300px'}}>The GG Lounge is the new exciting place for all ages to come and enjoy hours of fun with plenty to do for the whole family including:</Typography>

       
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - Retro & Modern Arcade machines
  </Typography>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - 65” touch screen games
  </Typography>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - Air Hockey Tables
  </Typography>
</Box>
<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - VR System
  </Typography>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - Pool tables
  </Typography>
  <Typography variant='h5' sx={{ color: 'white', mt: '20px', mx: '20px' }}> 
    - Toddler gadgets & cafe
  </Typography>
</Box>


        
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
