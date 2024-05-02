import React, { useState } from 'react';
import axios from 'axios';
import AdminHeader from '../../Components/common/adminHeader';
import { TextField, Checkbox, Button, FormControlLabel, Box, Rating, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CreateGameForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image_path: '',
    availability: false,
    platform: '',
    hourly_rate: 0,
    game_rating: 0,
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleRatingChange = (e, value) => {
    setFormData({ ...formData, game_rating: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.hourly_rate = formData.hourly_rate > 0 ? "" : "Hourly rate must be greater than 0";
    tempErrors.game_rating = formData.game_rating >= 0 && formData.game_rating <= 5 ? "" : "Rating must be between 0 and 5";
    tempErrors.description = formData.description ? "" : "Description is required";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please correct the errors before submitting.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/games/createGame', formData);
      alert('Game created successfully!');
      // You could also redirect or clear form here
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game. Please try again.');
    }
  };

  return (
    <Box>
      <AdminHeader />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <Box boxShadow={2} p={3} width={400}>
          {/* Add New Game title */}
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Add New Game
          </Typography>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
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
              error={!!errors.hourly_rate}
              helperText={errors.hourly_rate}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description}
            />
            {/* Star rating with margin top and bottom */}
            <Box marginTop={2} marginBottom={2}>
              <Rating
                value={formData.game_rating}
                onChange={handleRatingChange}
                name="game_rating"
                precision={0.5}
                color="primary"
              />
            </Box>
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
    </Box>
  );
};

export default CreateGameForm;
