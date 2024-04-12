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

const BookingTable = ({ loggedInUserId }) => {
  const [bookings, setBookings] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/bookings?userId=${loggedInUserId}`)
      .then(response => {
        const formattedBookings = response.data.data.bookings.map(booking => ({
          ...booking,
          date: new Date(booking.date).toLocaleDateString('en-US'),
          start_time: new Date(booking.start_time).toLocaleTimeString('en-US'),
          end_time: new Date(booking.end_time).toLocaleTimeString('en-US')
        }));
        setBookings(formattedBookings);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, [loggedInUserId]); 

  const handleEdit = (bookingId) => {
    // Replace this with your edit logic
    console.log(`Editing booking with id ${bookingId}`);
  };

  const handleDelete = (bookingId) => {
    setSelectedBookingId(bookingId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting booking with id ${selectedBookingId}`);
    axios.delete(`http://localhost:3000/api/bookings/${selectedBookingId}`)
      .then(response => {
        console.log('Booking deleted successfully');
        setBookings(bookings.filter(booking => booking._id !== selectedBookingId));
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
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
              <StyledTableHeaderCell>Date</StyledTableHeaderCell>
              <StyledTableHeaderCell>Start Time</StyledTableHeaderCell>
              <StyledTableHeaderCell>End Time</StyledTableHeaderCell>
              <StyledTableHeaderCell>Message Request</StyledTableHeaderCell>
              <StyledTableHeaderCell>User ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Game ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Status</StyledTableHeaderCell>
              <StyledTableHeaderCell>Number of Players</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {bookings.map(booking => (
              <StyledTableRow key={booking._id}>
                <StyledTableCell>{booking.date}</StyledTableCell>
                <StyledTableCell>{booking.start_time}</StyledTableCell>
                <StyledTableCell>{booking.end_time}</StyledTableCell>
                <StyledTableCell>{booking.message_request}</StyledTableCell>
                <StyledTableCell>{booking.user_id}</StyledTableCell>
                <StyledTableCell>{booking.game_id}</StyledTableCell>
                <StyledTableCell>{booking.status}</StyledTableCell>
                <StyledTableCell>{booking.num_players}</StyledTableCell>
                <StyledTableCell>
                  <Button 
                    variant="outlined" 
                    sx={{mr:'10px'}}
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleDelete(booking._id)}
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

export default BookingTable;
