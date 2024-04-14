import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const AddGame = () => {
  const [gameDetails, setGameDetails] = useState({
    name: '',
    image_path: null,
    availability: '',
    platform: '',
    hourly_rate: '',
    game_rating: '',
  });

  const [formData, setFormData] = useState(new FormData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: file.type });
        formData.append('image_path', blob, file.name);
        setFormData(formData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.append('name', gameDetails.name);
    formData.append('availability', gameDetails.availability);
    formData.append('platform', gameDetails.platform);
    formData.append('hourly_rate', gameDetails.hourly_rate);
    formData.append('game_rating', gameDetails.game_rating);

    try {
      const response = await axios.post('http://localhost:5000/api/games/createGame', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('New Game created:', response.data);

      if (response.status === 201) {
        window.alert('New game created!');
        setGameDetails({
          name: '',
          image_path: null,
          availability: '',
          platform: '',
          hourly_rate: '',
          game_rating: '',
        });
      }
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      boxShadow={3}
      p={3}
    >
      <Box maxWidth={400} width="100%">
        <h2>Add New Game</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={gameDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="availability"
            label="Availability"
            variant="outlined"
            value={gameDetails.availability}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="platform"
            label="Platform"
            variant="outlined"
            value={gameDetails.platform}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="hourly_rate"
            label="Hourly Rate"
            variant="outlined"
            value={gameDetails.hourly_rate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="game_rating"
            label="Game Rating"
            variant="outlined"
            value={gameDetails.game_rating}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-input"
            />
            <label htmlFor="image-input">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            {gameDetails.image_path && (
              <p>Selected Image: {gameDetails.image_path.name}</p>
            )}
          </Box>
          <Box textAlign="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Game
            </Button>
          </Box>
        </form>
        <Box textAlign="center" mt={2}>
          {/* Use NavLink for navigation */}
          <NavLink to="/gametable">
            <Button variant="contained" color="secondary">
              View All Games
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGame;
