// CreateGameForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, FormControlLabel, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CreateGameForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image_path: '',
    availability: false,
    platform: '',
    hourly_rate: 0,
    game_rating: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/games/createGame', formData);
      alert('Game created successfully!');
      // You can add more logic here, like redirecting to a different page
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game. Please try again.');
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box boxShadow={2} p={2} maxWidth={500}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image Path"
            name="image_path"
            value={formData.image_path}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.availability}
                onChange={handleCheckboxChange}
                name="availability"
              />
            }
            label="Availability"
          />
          <TextField
            label="Platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hourly Rate"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Game Rating"
            name="game_rating"
            value={formData.game_rating}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Game
          </Button>
          <NavLink to="/gametable" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
              View Game Table
            </Button>
          </NavLink>
        </form>
      </Box>
    </Box>
  );
};

export default CreateGameForm;
