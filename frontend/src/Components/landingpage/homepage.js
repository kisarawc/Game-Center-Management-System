import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../common/Header/header';
import Footer from '../common/Footer/footer';
import { useSpring, animated } from 'react-spring';

const HomePage = () => {
  const [currentImages, setCurrentImages] = useState(0);

  // Define state to toggle between two sets of images
  const [images, setImages] = useState([
    [
      "https://play-lh.googleusercontent.com/JfzlPWEwh8HX_FhqOtuxUI_Jh8GgasGqYAkKUKYWYjULquOKMQoQy_jmGZq7-ugNEflV",
      "https://m.media-amazon.com/images/M/MV5BZTliZGM2NzUtYjQ0My00YWM4LTg1NjUtYTNjMzFkNzczYTAxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
      "https://m.media-amazon.com/images/I/61fw7I5VRRL._AC_UF1000,1000_QL80_.jpg"
    ],
    [
      "https://m.media-amazon.com/images/M/MV5BZTliZGM2NzUtYjQ0My00YWM4LTg1NjUtYTNjMzFkNzczYTAxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
      "https://m.media-amazon.com/images/I/61fw7I5VRRL._AC_UF1000,1000_QL80_.jpg",
      "https://play-lh.googleusercontent.com/JfzlPWEwh8HX_FhqOtuxUI_Jh8GgasGqYAkKUKYWYjULquOKMQoQy_jmGZq7-ugNEflV"
    ]
  ]);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImages((prev) => (prev === 0 ? 1 : 0));
    }, 2000);


    return () => clearInterval(intervalId);
  }, []);

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
          //alignItems: 'center', 
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

        <Typography variant="h2" sx={{ color: 'white', fontSize: '2rem', marginBottom: '20px', marginLeft:'240px' }}>
          New Arival Games
        </Typography>

        <animated.div style={props}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            {images[currentImages].map((imageUrl, index) => (
              <animated.img
                key={index}
                src={imageUrl}
                alt={`Game ${index + 1}`}
                style={{
                  width: '300px',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                  marginRight: '20px',
                  transform: props.opacity.interpolate((o) => `scale(${o})`),
                }}
              />
            ))}
          </Box>
        </animated.div>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
