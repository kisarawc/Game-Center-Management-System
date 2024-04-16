import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2), 
  borderBottom: '1px solid #ccc',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#011276',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#011276',
  fontWeight: 'bold', 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, 
  },
}));

const GameTable = () => {

  const [games, setGames] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [editedGameDetails, setEditedGameDetails] = useState({
    name: '',
    image_path: '',
    platform: '',
    hourly_rate: '',
    game_rating: ''
  });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games`)
    .then(response => {
        console.log(response.data);
        const formattedGames = response.data.map(game => ({
          ...game,
          name: game.name,
          image_path: game.image_path,
          availability: game.availability,
          platform: game.platform,
          hourly_rate: game.hourly_rate,
          game_rating: game.game_rating
        }));
        setGames(formattedGames);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  }, []); 

  const handleEdit = (gameId) => {
    const selectedGame = games.find(game => game._id === gameId);
    setSelectedGame(selectedGame);
    setEditedGameDetails({
      name: selectedGame.name,
      image_path: selectedGame.image_path,
      platform: selectedGame.platform,
      hourly_rate: selectedGame.hourly_rate,
      game_rating: selectedGame.game_rating
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogConfirm = () => {
    axios.put(`http://localhost:5000/api/games/updateGame/${selectedGame._id}`, editedGameDetails)
      .then(response => {
        console.log('Game updated successfully');
        // Update the games state to reflect the changes
        const updatedGames = games.map(game => {
          if (game._id === selectedGame._id) {
            return {
              ...game,
              ...editedGameDetails
            };
          }
          return game;
        });
        setGames(updatedGames);
        setEditDialogOpen(false);
      })
      .catch(error => {
        console.error('Error updating game:', error);
      });
  };

  const handleDelete = (gameId) => {
    setSelectedGameId(gameId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting game with id ${selectedGameId}`);
    axios.delete(`http://localhost:5000/api/games/deleteGame/${selectedGameId}`)
      .then(response => {
        console.log('game deleted successfully');
        setGames(games.filter(game => game._id !== selectedGameId));
      })
      .catch(error => {
        console.error('Error deleting game:', error);
      });
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleSearch = () => {
    const filteredGames = games.filter(game =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setGames(filteredGames);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="outlined" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Image Path</StyledTableHeaderCell>
              <StyledTableHeaderCell>Platform</StyledTableHeaderCell>
              <StyledTableHeaderCell>Hourly Rate</StyledTableHeaderCell>
              <StyledTableHeaderCell>Game Rating</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {games.map(game => (
              <StyledTableRow key={game._id}>
                <StyledTableCell>{game.name}</StyledTableCell>
                <StyledTableCell>{game.image_path}</StyledTableCell>
                <StyledTableCell>{game.platform}</StyledTableCell>
                <StyledTableCell>{game.hourly_rate}</StyledTableCell>
                <StyledTableCell>{game.game_rating}</StyledTableCell>
                <StyledTableCell>
                  <Button 
                    variant="outlined" 
                    sx={{mr:'10px'}}
                    onClick={() => handleEdit(game._id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDelete(game._id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edit Game</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedGameDetails.name}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image Path"
            value={editedGameDetails.image_path}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, image_path: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Platform"
            value={editedGameDetails.platform}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, platform: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Hourly Rate"
            value={editedGameDetails.hourly_rate}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, hourly_rate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Game Rating"
            value={editedGameDetails.game_rating}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, game_rating: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditDialogConfirm} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameTable;
