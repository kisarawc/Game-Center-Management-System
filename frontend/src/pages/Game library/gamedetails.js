import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const GameDetailPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);  // Ensure loading is set at the beginning of the fetch
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
        if (response.data) {
          setGame(response.data);
        } else {
          throw new Error('No game data available');
        }
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Error fetching game details');
      } finally {
        setLoading(false);  // Ensure loading is set false in both success and failure cases
      }
    };

    fetchGame();
  }, [gameId]);

  // Debugging the updated game state
  useEffect(() => {
    if (game) {
      console.log('Updated game name:', game.name);
    }
  }, [game]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <Typography variant="h2">{game.name}</Typography>
            <img src={game.image_path} alt={game.title || "Game Image"} style={{ maxWidth: '100%' }} />
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
