import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  textAlign: 'center', 
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  textOverflow: 'ellipsis', 
  position: 'relative',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#011276',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#011276',
  fontWeight: 'bold',
  textAlign: 'center', 
  position: 'relative', 
  cursor: 'pointer',
}));

const StyledSortIcon = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: '4px',
  transform: 'translateY(-50%)',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const renderStarRating = (rating) => {
  const wholeNumberRating = Math.round(Math.min(Math.max(rating, 0), 5));
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
    availability: false, 
  });
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
      availability: selectedGame.availability,
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
        toast.success('Game updated successfully');
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
        setDeleteDialogOpen(false);
        toast.success('Game deleted successfully');
      }).catch((error) => {
        console.error('Error deleting game:', error);
      });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const generateGameReport = () => {
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
      game.availability ? 'Available' : 'Not Available',
    ]);

    autoTable(doc, {
      head: [['Name', 'Platform', 'Hourly Rate', 'Game Rating', 'Description', 'Availability']],
      body: tableData,
      startY: 40,
    });

    doc.save('GameReport.pdf');
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  const getArrow = (columnName) => {
    if (sortBy === columnName) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'hourly_rate') {
      return sortOrder === 'asc' ? a.hourly_rate - b.hourly_rate : b.hourly_rate - a.hourly_rate;
    } else if (sortBy === 'game_rating') {
      return sortOrder === 'asc' ? a.game_rating - b.game_rating : b.game_rating - a.game_rating;
    }
    return 0;
  });

  return (
    <>
      <AdminHeader />
      <ToastContainer />
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
          
          <Grid item>
            <NavLink to="/addgame" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="small">
                Add Games
              </Button>
            </NavLink>
          </Grid>
         
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={generateGameReport}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TableContainer component={Paper} style={{ width: '100%' }}>
          <Table style={{ tableLayout: 'fixed' }}>
            <StyledTableHead>
              <TableRow>
                <StyledTableHeaderCell
                  style={{ width: '20%' }}
                  onClick={() => handleSort('name')}
                >
                  Name
                  <StyledSortIcon>
                    {getArrow('name')}
                  </StyledSortIcon>
                </StyledTableHeaderCell>
                <StyledTableHeaderCell
                  style={{ width: '20%' }}
                  onClick={() => handleSort('image_path')}
                >
                  Image Path
                </StyledTableHeaderCell>
                <StyledTableHeaderCell
                  style={{ width: '10%' }}
                  onClick={() => handleSort('platform')}
                >
                  Platform
                </StyledTableHeaderCell>
                <StyledTableHeaderCell
                  style={{ width: '8%' }}
                  onClick={() => handleSort('hourly_rate')}
                >
                  Hourly Rate
                  <StyledSortIcon>
                    {getArrow('hourly_rate')}
                  </StyledSortIcon>
                </StyledTableHeaderCell>
                <StyledTableHeaderCell
                  style={{ width: '12%' }}
                  onClick={() => handleSort('game_rating')}
                >
                  Game Rating
                  <StyledSortIcon>
                    {getArrow('game_rating')}
                  </StyledSortIcon>
                </StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '20%' }}>Description</StyledTableHeaderCell>
                <StyledTableHeaderCell style={{ width: '10%' }}>Availability</StyledTableHeaderCell> 
                <StyledTableHeaderCell style={{ width: '20%' }}>Actions</StyledTableHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {sortedGames
                .filter((game) => game.name.toLowerCase().includes(searchText.toLowerCase()))
                .map((game) => (
                  <StyledTableRow key={game._id}>
                    <StyledTableCell style={{ width: '20%' }}>{game.name}</StyledTableCell>
                    <StyledTableCell style={{ width: '20%' }}>{game.image_path}</StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>{game.platform}</StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>{game.hourly_rate}</StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>{renderStarRating(game.game_rating)}</StyledTableCell>
                    <StyledTableCell style={{ width: '20%' }}>{game.description}</StyledTableCell>
                    <StyledTableCell style={{ width: '10%' }}>{game.availability ? 'Available' : 'Not Available'}</StyledTableCell> 
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
          <TextField
            label="Availability"
            select
            value={editedGameDetails.availability}
            onChange={(e) => setEditedGameDetails({ ...editedGameDetails, availability: e.target.value === 'true' })}
            fullWidth
            margin="normal"
          >
            <MenuItem value={'true'}>Available</MenuItem>
            <MenuItem value={'false'}>Not Available</MenuItem>
          </TextField>
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
