import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2), 
  borderBottom: '1px solid #ccc',
  fontSize:'15px',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#011276',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#5f0e9d',
  fontWeight: 'bold', 
  fontSize:'18px',
  textAlign:'center'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, 
  },
}));

const BookingTable = ({ loggedInUserId }) => {
  console.log(loggedInUserId)

  const [bookings, setBookings] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/bookings/user/${loggedInUserId}`)
    .then(response => {
        console.log(response.data);
        const formattedBookings = response.data.map(booking => ({
          ...booking,
          date: new Date(booking.date).toLocaleDateString('en-US'),
          start_time: new Date(booking.start_time).toLocaleTimeString('en-US', {timeZone: 'UTC'}), // Adjust timezone to UTC
          duration: booking.duration,
          message_request: booking.message_request,
          user_id: booking.user_id,
          game_id: booking.game_id,
          status: booking.status,
          num_players: booking.num_players,
          fee: booking.fee
        }));
        setBookings(formattedBookings);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, [loggedInUserId]); 

  const handleEdit = (bookingId) => {
    window.location.href = `./bookings/edit/${bookingId}`;
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
              <StyledTableHeaderCell>Duration (minutes)</StyledTableHeaderCell> 
              <StyledTableHeaderCell>Message Request</StyledTableHeaderCell>
              
              <StyledTableHeaderCell>Game Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Status</StyledTableHeaderCell>
              <StyledTableHeaderCell>Players</StyledTableHeaderCell>
              <StyledTableHeaderCell>Fee</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {bookings.map(booking => (
              <StyledTableRow key={booking._id}>
                <StyledTableCell>{booking.date}</StyledTableCell>
                <StyledTableCell>{booking.start_time}</StyledTableCell>
                <StyledTableCell>{booking.duration}</StyledTableCell>
                <StyledTableCell>{booking.message_request}</StyledTableCell>
                
                <StyledTableCell>{booking.game_name}</StyledTableCell>
                <StyledTableCell>{booking.status}</StyledTableCell>
                <StyledTableCell>{booking.num_players}</StyledTableCell>
                <StyledTableCell>Rs. {booking.fee}.00</StyledTableCell>
                <StyledTableCell>
                  <Button 
                    variant="contained" 
                    sx={{mr:'10px' ,
                     backgroundColor:'#189f88',
                     '&:hover': {
                      backgroundColor: '#4dc7bd'
                    }
                    }}
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{backgroundColor:'#d02727',
                    '&:hover': {
                      backgroundColor: '#f56a6a'
                    }}}
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
        sx={{
          backgroundImage: `url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //justifyContent: 'center',
          padding: '20px',
        }}
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{color:'#fc6f6f', fontSize:'25px'}}>
            Are you sure you want to delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant='contained' sx={{color:'white', backgroundColor: '#534890'}}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant='contained' sx={{color:'white', backgroundColor: '#534890' ,'&:hover': {
      backgroundColor: '#f4656a'}}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Box>
      </Dialog>
    </>
  );
};

export default BookingTable;
