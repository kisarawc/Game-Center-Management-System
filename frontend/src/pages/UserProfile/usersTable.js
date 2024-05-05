import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton, Drawer, List, ListItem, ListItemText, Checkbox, MenuItem, Select, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import AdminHeader from '../../Components/common/adminHeader';
import logo from '../../images/header/logo.jpeg';
import MenuIcon from '@mui/icons-material/Menu';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderBottom: '1px solid #ccc',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#00008b',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#838383',
  fontWeight: 'bold',
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#EEEEEE',
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#ff0000',
  '&:hover': {
    backgroundColor: '#cc0000',
  },
}));

const GenerateReportButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(92.6),
}));

const HorizontalBar = styled('hr')({
  margin: '20px 0',
  border: '0',
  borderTop: '1px solid #ccc',
});

const Sidebar = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '230px',
    backgroundColor: '#f0f0f0',
    height: '500px',
    borderRadius: '20px',
    marginTop: '50px', 
  },
}));

const FilterOption = styled(ListItem)(({ theme }) => ({
  '& .MuiTypography-body1': {
    fontSize: '0.8rem',
  },
}));

const SortingOption = styled(FilterOption)({
  marginTop: '16px',
});

const TotalUsers = styled(ListItem)(({ theme }) => ({
  marginTop: '16px',
  '& .MuiTypography-body1': {
    fontSize: '0.8rem',
  },
}));

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFemaleUsers, setTotalFemaleUsers] = useState(0);
  const [totalMaleUsers, setTotalMaleUsers] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterFemale, setFilterFemale] = useState(false);
  const [filterMale, setFilterMale] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users`)
      .then(response => {
        const formattedUsers = response.data.data.users.map(user => ({
          ...user,
          name: user.name,
          username: user.username,
          email: user.email,
          gender: user.gender,
          bDate: user.bDate,
          phoneNumber: user.phoneNumber,
        }));
        setUsers(formattedUsers);
        // Calculate counts
        setTotalUsers(formattedUsers.length);
        const femaleCount = formattedUsers.filter(user => user.gender.toLowerCase() === 'female').length;
        const maleCount = formattedUsers.filter(user => user.gender.toLowerCase() === 'male').length;
        setTotalFemaleUsers(femaleCount);
        setTotalMaleUsers(maleCount);
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
        // Recalculate counts
        setTotalUsers(totalUsers - 1);
        const deletedUser = users.find(user => user._id === selectedUserID);
        if (deletedUser.gender.toLowerCase() === 'female') {
          setTotalFemaleUsers(totalFemaleUsers - 1);
        } else {
          setTotalMaleUsers(totalMaleUsers - 1);
        }
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

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'female') {
      setFilterFemale(checked);
    } else if (name === 'male') {
      setFilterMale(checked);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(user => {
    const { name, username, email } = user;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(searchTermLowerCase) ||
      username.toLowerCase().includes(searchTermLowerCase) ||
      email.toLowerCase().includes(searchTermLowerCase)
    );
  });

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
      doc.text(`Report generated: ${new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })}`, 150, 25);
    };

    const addFooterToPdf = (doc) => {
      const footerText = 'GG LOUNGE\n165/A, New Kandy Rd, Welivita Junction, Malabe';
      doc.setFontSize(10);
      doc.setTextColor('#555');
      doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    };

    addHeaderToPdf(doc);

    addFooterToPdf(doc);
    doc.autoTable({
      head: [['Name', 'Username', 'Email', 'Gender', 'Phone Number', 'Birth Date']],
      body: users.map((user) => [user.name, user.username, user.email, user.gender, user.phoneNumber, new Date(user.bDate).toLocaleDateString()]),
      startY: 40,
      margin: { top: 20 }
    });

    doc.save('UserReport.pdf');
  }

  return (
    <Box>
      <AdminHeader/>
      <IconButton onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
        <MenuIcon />
      </IconButton>
      <Sidebar
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <List>
          <Typography variant="h6" style={{ margin: '10px 10px', fontWeight: 'bold'}}>
            Gender
          </Typography>
          <FilterOption>
            <Checkbox
              checked={filterFemale}
              onChange={handleFilterChange}
              name="female"
            />
            <ListItemText primary={`Female`} />
          </FilterOption>
          <FilterOption>
            <Checkbox
              checked={filterMale}
              onChange={handleFilterChange}
              name="male"
            />
            <ListItemText primary={`Male `} />
          </FilterOption>
          <Divider />
          <Typography variant="h6" style={{ margin: '10px 10px', fontWeight: 'bold' }}>
            Sort By Name
          </Typography>
          <SortingOption>
            <ListItemText primary="Sort By Name" />
            <Select
              value={sortOrder}
              onChange={(event) => handleSort(event.target.value)}
            >
              <MenuItem value="asc">A-Z</MenuItem>
              <MenuItem value="desc">Z-A</MenuItem>
            </Select>
          </SortingOption>
          <Divider />
          <Typography variant="h6" style={{ margin: '10px 10px', fontWeight: 'bold' }}>
            User Counts
          </Typography>
          <TotalUsers style={{ marginTop: '5px' }}>
            <ListItemText primary={`Total Users: ${totalUsers}`} />
          </TotalUsers>
          <TotalUsers style={{ marginTop: '5px' }}>
            <ListItemText primary={`Total Female Users: ${totalFemaleUsers}`} />
          </TotalUsers>
          <TotalUsers style={{ marginTop: '5px' }}>
            <ListItemText primary={`Total Male Users: ${totalMaleUsers}`} />
          </TotalUsers>
        </List>
      </Sidebar>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            marginBottom: '16px',
            marginTop:'14px',
            width: '30%',
            height: '36px',
            '& .MuiInputBase-root': {
              paddingRight: '0',
            },
            '& .MuiInputLabel-root': {
              position: 'relative',
            },
            '& .MuiInputLabel-formControl': {
              left: '50%',
              transform: 'translateX(-50%)',
            },
            '& .MuiOutlinedInput-input': {
              padding: '8px',
              textAlign: 'center',
            },
            '& .MuiOutlinedInput-adornedEnd': {
              paddingRight: '8px',
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
            sx: {
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
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
              <StyledTableHeaderCell>Phone Number</StyledTableHeaderCell>
              <StyledTableHeaderCell>Birth Date</StyledTableHeaderCell>
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
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{new Date(user.bDate).toLocaleDateString()}</StyledTableCell>
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
    </Box>
  );
};

export default UsersTable;
