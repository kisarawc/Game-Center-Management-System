import React, { useState, useEffect } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: 200,
  margin: '30px',
  border: '1px solid #FB41FF',
  borderBottom: 'none',
  borderRadius: '10px', // Add this line to set the border radius
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
    borderRadius: '5px', // Smaller radius for small screens
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
      color: '#FFFFFF',
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
  borderRadius: '10px', // Add this line to match the border radius
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
  borderRadius: '10px', // Add this line to match the border radius
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

// Styled header for the "Game Library" title
const StyledHeader = styled('h1')({
  color: '#FFC0CB',
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: '3px',
  textShadow: '1px 1px px #000',
});

const Game = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
      });
  }, []);

  // Filter games based on the search term
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <StyledHeader>Game Library</StyledHeader>
        {/* Container for the search bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            paddingBottom: '20px',
            paddingRight: '20px',
          }}
        >
          {/* Search bar */}
          <TextField
            label="Search Games"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginRight: '20px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {filteredGames.map((game) => (
            <NavLink key={game._id} to={`/gamedetails/${game._id}`} style={{ textDecoration: 'none' }}>
              <ImageButton focusRipple>
                <ImageSrc style={{ backgroundImage: `url(${game.image_path})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{
                      position: 'absolute',
                      bottom: '10px',
                      fontSize: '12px',
                      color: 'rgba(107, 107, 107, 0.5)',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      textDecoration: 'none',
                    }}
                  >
                    {game.name}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </NavLink>
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Game;