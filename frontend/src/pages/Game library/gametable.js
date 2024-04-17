import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AdminHeader from '../../Components/common/adminHeader';
import logo from '../../images/header/logo.jpeg';
import { NavLink } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid #ccc',
  textAlign: 'center', // Center-align text in each cell
  whiteSpace: 'nowrap', // Ensure that the text stays on a single line
  overflow: 'hidden', // Hide any overflow content
  textOverflow: 'ellipsis', // Add an ellipsis (...) if content overflows
}));


const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#011276',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#011276',
  fontWeight: 'bold',
  textAlign: 'center', // Center-align text in header cells
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const renderStarRating = (rating) => {
  const wholeNumberRating = Math.round(rating);
  const maxRating = 5;
  let stars = '⭐'.repeat(wholeNumberRating);
  stars += '☆'.repeat(maxRating - wholeNumberRating);
  return stars;
};

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
    game_rating: '',
    description: '',
  });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games`).then((response) => {
      const formattedGames = response.data.map((game) => ({
        ...game,
        name: game.name,
        image_path: game.image_path,
        availability: game.availability,
        platform: game.platform,
        hourly_rate: game.hourly_rate,
        game_rating: game.game_rating,
        description: game.description,
      }));
      setGames(formattedGames);
    }).catch((error) => {
      console.error('Error fetching games:', error);
    });
  }, []);

  const handleEdit = (gameId) => {
    const selectedGame = games.find((game) => game._id === gameId);
    setSelectedGame(selectedGame);
    setEditedGameDetails({
      name: selectedGame.name,
      image_path: selectedGame.image_path,
      platform: selectedGame.platform,
      hourly_rate: selectedGame.hourly_rate,
      game_rating: selectedGame.game_rating,
      description: selectedGame.description,
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogConfirm = () => {
    axios.put(`http://localhost:5000/api/games/updateGame/${selectedGame._id}`, editedGameDetails)
      .then(() => {
        console.log('Game updated successfully');
        const updatedGames = games.map((game) => {
          if (game._id === selectedGame._id) {
            return {
              ...game,
              ...editedGameDetails,
            };
          }
          return game;
        });
        setGames(updatedGames);
        setEditDialogOpen(false);
      }).catch((error) => {
        console.error('Error updating game:', error);
      });
  };

  const handleDelete = (gameId) => {
    setSelectedGameId(gameId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:5000/api/games/deleteGame/${selectedGameId}`)
      .then(() => {
        console.log('Game deleted successfully');
        setGames(games.filter((game) => game._id !== selectedGameId));
      }).catch((error) => {
        console.error('Error deleting game:', error);
      });
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const generateUserReport = () => {
    const doc = new jsPDF();

    const addHeaderToPdf = (doc) => {
      const logoImage = logo;
      const imgWidth = 20;
      const imgHeight = 20;

      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
      doc.addImage(logoImage, 'JPEG', 10, 5, imgWidth, imgHeight);
      doc.text('GG LOUNGE GAME CENTER', 50, 18);
      doc.setFontSize(10);
      doc.text(`Report generated: ${new Date().toLocaleDateString()}`, 150, 25);
    };

    const addFooterToPdf = (doc) => {
      const footerText = 'GG LOUNGE\n165/A, New Kandy Rd, Welivita Junction, Malabe';
      doc.setFontSize(10);
      doc.setTextColor('#555');
      doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    };

    addHeaderToPdf(doc);
    addFooterToPdf(doc);

    const tableData = games.map((game) => [
      game.name,
      game.platform,
      game.hourly_rate,
      game.game_rating,
      game.description,
    ]);

    autoTable(doc, {
      head: [['Name', 'Platform', 'Hourly Rate', 'Game Rating', 'Description']],
      body: tableData,
      startY: 40,
    });

    doc.save('UserReport.pdf');
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <AdminHeader />
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={3} width="100%">
        <Grid container justifyContent="center" spacing={3}>
          {/* Search bar */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              fullWidth
            />
          </Grid>
          {/* "Add Games" button */}
          <Grid item>
            <NavLink to="/addgame" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="small">
                Add Games
              </Button>
            </NavLink>
          </Grid>
          {/* Generate Report button */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={generateUserReport}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TableContainer component={Paper} style={{ width: '100%' }}>
          <Table  style={{ tableLayout: 'fixed' }}>
            <StyledTableHead>
              <TableRow>
                <StyledTableHeaderCell style={{ width: '10%' }}>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '20%' }}>Image Path</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '10%' }}>Platform</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '10%' }}>Hourly Rate</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '10%' }}>Game Rating</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '20%' }}>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '20%' }}>Actions</StyledTableHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {filteredGames.map((game) => (
                <StyledTableRow key={game._id}>
                  <StyledTableCell style={{ width: '20%' }}>{game.name}</StyledTableCell>
                  <StyledTableCell style={{ width: '20%' }}>{game.image_path}</StyledTableCell>
                  <StyledTableCell style={{ width: '10%' }}>{game.platform}</StyledTableCell>
                  <StyledTableCell style={{ width: '10%' }}>{game.hourly_rate}</StyledTableCell>
                  <StyledTableCell style={{ width: '10%' }}>{renderStarRating(game.game_rating)}</StyledTableCell>
                  <StyledTableCell style={{ width: '20%' }}>{game.description}</StyledTableCell>
                  <StyledTableCell style={{ width: '10%' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(game._id)}
                      sx={{ marginRight: '5px', marginBottom: '5px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(game._id)}
                      sx={{ marginBottom: '5px' }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Game</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" size="small" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit game dialog */}
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
          <TextField
            label="Description"
            value={editedGameDetails.description}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, description: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={handleEditDialogConfirm} color="primary" size="small" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameTable;
