import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const AddGame = () => {
  const [gameDetails, setGameDetails] = useState({
    gameId: '',
    title: '',
    description: '',
    rating: '',
    genre: '',
    image: null, // Initialize image state to null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setGameDetails(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Game Details:", gameDetails);

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
            name="gameId"
            label="Game ID"
            variant="outlined"
            value={gameDetails.gameId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={gameDetails.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={gameDetails.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="rating"
            label="Rating"
            variant="outlined"
            value={gameDetails.rating}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="genre"
            label="Genre"
            variant="outlined"
            value={gameDetails.genre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* File input for uploading image */}
          <Box mt={2}> {/* Two-line space */}
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
            {gameDetails.image && (
              <p>Selected Image: {gameDetails.image.name}</p>
            )}
          </Box>
          <Box textAlign="center" mt={2}> {/* Center the button */}
            <Button type="submit" variant="contained" color="primary">
              Add Game
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddGame;
