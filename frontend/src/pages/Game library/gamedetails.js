import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card } from '@mui/material';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import RatingStars from './ratingStars';


const GameDetailPage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
        console.log(response.data)
        if (response.data) {
          setGame(response.data);
        } else {
          throw new Error('No game data available');
        }
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Error fetching game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

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
          padding: '20px',
          textAlign: 'center',
        }}
      >
        {game ? (
          <Box
            sx={{
              mt: '10px',
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginBottom: '50px',
              backgroundColor: 'rgba(255, 255, 255, .21)',
              borderRadius: '10px',
              padding: '20px',
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Card sx={{ maxWidth: '100%', borderRadius: '40px', boxShadow: 'none', overflow: 'hidden' , backgroundColor:'transparent'}}>
                <img src={game.image_path} alt={game.title || "Game Image"} style={{ width: '100%', height: 'auto', borderRadius: '10px 0 0 10px' }} />
              </Card>
            </Box>
            <Box sx={{ width: '50%', padding: '20px', textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontFamily: 'Arial', fontWeight: 'bold', marginBottom: '20px' }}>{game.name}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Arial', marginBottom: '10px' }}>Description: {game.description}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Arial', marginBottom: '10px' }}>Rating: <RatingStars rating={game.game_rating} /></Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Arial', marginBottom: '10px' }}>Hourly Rate: {game.hourly_rate}</Typography>
              
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </Box>
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
