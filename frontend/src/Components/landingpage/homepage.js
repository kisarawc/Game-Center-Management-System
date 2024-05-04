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
    config: { duration: 1500 },
  });

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `
            url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png'),
            url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Game-over.png')
          `,
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
            marginBottom: '70px',
            fontSize: '5rem',
            mt: '100px'
          }}
        >
          - The <span style={{ color: '#14e9f2', fontFamily: 'Roboto', textShadow: '0 0 10px' }}>GG</span> Lounge -
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

        <Typography variant='h5'
          sx={{
            color: '#01cae5',
            textAlign: 'center',
            fontSize: '1.7rem', mt: '100px',
            ml: '300px', mr: '300px'
          }}>The GG Lounge is the new exciting place for all ages to come and enjoy hours of fun with plenty to do for the whole family including:

        </Typography>


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

        </Box><img
          src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Pink-lightning-2.png'
          style={{
            height: '100px',
            width: '100px',
            marginLeft: '1200px'
          }}
        />
        <img
          src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Blue-lightning-2.png'
          style={{ marginLeft: '50px', height: '100px', width: '100px', }}
        />
        <img
          src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Curve-top-3-1536x154.png'
        />
        <Box
          sx={{
            backgroundColor: '#244b8a', display: 'flex', flexDirection: 'row',
          }}
        >
          <Box sx={{ marginTop: '10px' }}>
            <Typography variant='h3' sx={{ textAlign: 'center', mb: '20px' }}>About Us</Typography>
            <Typography variant='h5' textAlign={'center'} sx={{ ml: '100px', mr: '100px', fontFamily: 'fantasy', mb: '50px' }}>Opening the GG Lounge in April 2019 marking our 1 year anniversary of our Arcade Warehouse Scunthorpe open day we are extremely excited and ready to host Lincolns one and only FREE PLAY Arcade centre.

              Gaming has always been a passion of ours and opening an arcade has been our directors dream for many years. It has taken a lot of hard work and dedication to the gaming industry but finally our first Arcade is ready for you all.

              The past 3-5 years has seen a huge increase in retro gaming and Esports and being at the forefront of this technology with our retail shop we knew now was the time we put everything in to opening this wonderful family venue for you all.</Typography>
          </Box>

          <img
            src='https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Graphic.png'
            style={{
              height: '400px',
              width: '500px',
              marginLeft: '40px',
              marginTop: '100px',
              marginRight: '40px',


            }}
          />
 </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '50px', mb: '100px' }} >
            <img
              src="https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Gaming-pic.png"
              alt="Gaming Pic"
              style={{
                height: '200px',
                alignSelf: 'flex-start',
                marginRight: '250px',
                marginLeft: '250px',
                marginTop: '50px'
              }}
            />


            <Box>

              <Typography variant='h3' color='#ba39f7' sx={{ mt: '100px', fontSize: '2rem', ml: '115px' }}>Our locations</Typography>
              <Typography variant='h5' color='white' sx={{ mt: '20px', fontSize: '1.4rem', textAlign: 'center' }}>165/A, New Kandy Rd, Welivita Junction <br /> Malabe</Typography>
            </Box>
          </Box>


       
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
