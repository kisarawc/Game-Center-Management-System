import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2), 
  backgroundColor: '#4B0089',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontFamily: 'Arial', // Change font style
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2), 
  borderBottom: '1px solid #ccc',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#5A189A', // Adjust color of purple bar
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#7B1FA2', // Adjust color of table header cell
  fontWeight: 'bold', 
  textAlign: 'center', // Center align the text in the header cell
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f0f0', // Changed to a lighter shade
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#ff0000',
  '&:hover': {
    backgroundColor: '#cc0000', // Darkened the hover color
  },
}));

const UsersTable = ({ loggedInUserId }) => {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users?userId=${loggedInUserId}`)
      .then(response => {
        const formattedUsers = response.data.data.users.map(user => ({
          ...user,
          name: user.name,
          username: user.username,
          email: user.email,
          gender: user.gender,
          joinDate: user.joinDate
        }));
        setUsers(formattedUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [loggedInUserId]); 

  const handleDelete = (userId) => {
    setSelectedUserID(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting user with id ${selectedUserID}`);
    axios.delete(`http://localhost:3000/api/users/deleteUser/${selectedUserID}`)
      .then(response => {
        console.log('User deleted successfully');
        setUsers(users.filter(user => user._id !== selectedUserID));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <StyledHeader variant="h4">All Users</StyledHeader>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Username</StyledTableHeaderCell>
              <StyledTableHeaderCell>Email</StyledTableHeaderCell>
              <StyledTableHeaderCell>Gender</StyledTableHeaderCell>
              <StyledTableHeaderCell>Joined Date</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {users.map(user => (
              <StyledTableRow key={user._id}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.username}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.gender}</StyledTableCell>
                <StyledTableCell>{user.joinDate}</StyledTableCell>
                <StyledTableCell>
                  <DeleteButton 
                    variant="contained" 
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </DeleteButton>
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
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
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

export default UsersTable;
