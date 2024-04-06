import React from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// Import images from the images folder
import gameImage1 from '../../images/GamesLibrary/pic1.png';
import gameImage2 from '../../images/GamesLibrary/pic2.jpg';
import gameImage3 from '../../images/GamesLibrary/unnamed.png';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: 200, // Adjust as needed
  margin: '30px', 
  border: '1px solid #FB41FF',
  borderBottom: 'none', // Remove border-bottom
  variant: "outlined",// Adjust as needed
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.55,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '3px solid #FFFF',
      variant: "outlined",
      color: '#FFFFFF', // Change color to white
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.1,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Game = () => {
  const games = [
    { 
      id: 1,
      title: 'See More',
      description: 'Description of Game 1',
      image: gameImage1, // Path to the image for Game 1
      rating: 4.5,
      genre: 'Adventure'
    },
    { 
      id: 2,
      title: 'See More',
      description: 'Description of Game 2',
      image: gameImage2, // Path to the image for Game 2
      rating: 3.8,
      genre: 'Action'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
     { 
      id: 3,
      title: 'See More',
      description: 'Description of Game 3',
      image: gameImage3, // Path to the image for Game 3
      rating: 4.2,
      genre: 'Strategy'
    },
    // Add more games with their details as needed
  ];

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
        <h1>Game Library</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {games.map(game => (
            <ImageButton
              focusRipple
              key={game.title}
            >
              <ImageSrc style={{ backgroundImage: `url(${game.image})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{
                    position: 'absolute',
                    bottom: '10px', // Align to the bottom
                    fontSize: '12px', // Decrease font size
                    color: 'rgba(107, 107, 107, 0.5)', // Decrease visibility
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    textDecoration: 'none', // Remove underline
                  }}
                >
                  {game.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Game;