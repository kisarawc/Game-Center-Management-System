import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games`)
      .then(response => {
        const formattedGames = response.data.data.games.map(game => ({
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
  },); 

  const handleEdit = (gameId) => {
    // Replace this with your edit logic
    console.log(`Editing game with id ${gameId}`);
  };

  const handleDelete = (gameId) => {
    setSelectedGameId(gameId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting game with id ${selectedGameId}`);
    axios.delete(`http://localhost:5000/api/games/deleteGame/${selectedGameId}`)
      .then(response => {
        console.log('Game deleted successfully');
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Image Path</StyledTableHeaderCell>
              <StyledTableHeaderCell>Availability</StyledTableHeaderCell>
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
                <StyledTableCell>{game.availability}</StyledTableCell>
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
    </>
  );
};

export default GameTable;