import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import gameImage1 from '../../images/GamesLibrary/pic1.png';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import gameImage2 from '../../images/GamesLibrary/pic2.jpg';

const GameDetailPage = () => {
  const { gameId } = useParams();

  const games = [
    {
      gameId: '1',
      title: 'Example Game 1',
      description: 'Description of Example Game 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      rating: '4.5',
      genre: 'Adventure',
      image: gameImage1, 
    },
    {
      gameId: '2',
      title: 'Example Game 2',
      description: 'Description of Example Game 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      rating: '4.7',
      genre: 'Action',
      image: gameImage2, 
    },
  ];

  const game = games.find(game => game.gameId === gameId);

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
        {game ? (
          <Box>
            <Typography variant="h2">{game.title}</Typography>
            <img src={game.image} alt={game.title} style={{ maxWidth: '100%' }} />
            <Typography variant="body1">Description: {game.description}</Typography>
            <Typography variant="body1">Rating: {game.rating}/5</Typography>
            <Typography variant="body1">Genre: {game.genre}</Typography>

            <Button variant="contained" color="primary">
              Book Now
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Game not found!</Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default GameDetailPage;
