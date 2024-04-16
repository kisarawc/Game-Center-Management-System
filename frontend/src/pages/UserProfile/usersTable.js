import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StyledHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  color: theme.palette.common.black,
  fontWeight: 'bolder',
  marginBottom: theme.spacing(2),
  fontFamily: 'fantasy',
  fontSize: '3.0rem',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderBottom: '1px solid #ccc',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#494949', // Adjust color of purple bar
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#7B1FA2', // Adjust color of table header cell
  fontWeight: 'bold',
  textAlign: 'center', // Center align the text in the header cell
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#EEEEEE', // Changed to a lighter shade
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#ff0000',
  '&:hover': {
    backgroundColor: '#cc0000', // Darkened the hover color
  },
}));

const GenerateReportButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(92.6), // Add some left margin for spacing
}));

const HorizontalBar = styled('hr')({
  margin: '20px 0',
  border: '0',
  borderTop: '1px solid #ccc',
});

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users`)
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
  }, []);

  const handleDelete = (userId) => {
    setSelectedUserID(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting user with id ${selectedUserID}`);
    axios.delete(`http://localhost:5000/api/users/deleteUser/${selectedUserID}`)
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.joinDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* Generate user report */
  const generateUserReport = () => {
    const doc = new jsPDF()

    doc.setFontSize(30)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 255)
    doc.text('User Report', 105, 10, 'center')

    autoTable(
      doc,
      {
        head: rtitle,
        body: rbody
      }, 40, 100
    )
    doc.save('UserReport.pdf')
  }

  var rtitle = [['Name', 'Username', 'Email', 'Gender', 'Joined Date']]

  var rbody = users && users.map((user) => (
    [user.name, user.username, user.email, user.gender, user.joinDate]
  ))

  return (
    <>
      <StyledHeader variant="h4">All Users</StyledHeader>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            marginBottom: '16px', // Add some bottom margin for spacing
            width: '30%', // Make the search bar span the full width of its container
            height: '36px', // Set the height of the search bar
            '& .MuiInputBase-root': {
              paddingRight: '0', // Remove default padding on the right side
            },
            '& .MuiInputLabel-root': {
              position: 'relative', // Set position to relative for proper centering
            },
            '& .MuiInputLabel-formControl': {
              left: '50%', // Move the label to the left by 50% of its container
              transform: 'translateX(-50%)', // Translate the label back by 50% of its own width
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px', // Adjust the padding of the input field
              textAlign: 'center', // Center align the text in the input field
            },
            '& .MuiOutlinedInput-adornedEnd': {
              paddingRight: '8px', // Add padding to the end for the search icon
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
            sx: {
              borderRadius: '8px', // Rounded corners
              backgroundColor: '#f0f0f0', // Light gray background color
            },
          }}
        />
        <GenerateReportButton variant="contained" onClick={generateUserReport}>
          Generate Report
        </GenerateReportButton>
      </div>
      <HorizontalBar />
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
            {filteredUsers.map(user => (
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
