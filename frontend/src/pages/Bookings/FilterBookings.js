// FilterBookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const FilterBookings = ({ onFilter }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch games from backend
    axios.get('/api/games')
      .then(response => {
        setGames(response.data.data.games); // Assuming API returns an object with a 'games' key
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  }, []);

  const handleFilter = () => {
    onFilter(selectedGame, selectedDate);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="Select Game"
          value={selectedGame}
          onChange={e => setSelectedGame(e.target.value)}
        >
          {games.map(game => (
            <MenuItem key={game._id} value={game._id}>
              {game.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          type="date"
          label="Select Date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterBookings;
