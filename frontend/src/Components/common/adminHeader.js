import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  window.location.href='/login';
};

const AdminAppBar = () => {
  return (
<Box>
    <AppBar position="static">
      <Toolbar sx={{backgroundColor:'#222831'}}>
        <IconButton
          size="large"
          edge="start"
          color="#6d4af6"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
         
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, color:'#ffffff' }}>
          GG LOUNGE / ADMIN PANEL
        </Typography>

<Box sx={{mr:'20px'}}>
    <Button component={Link} to="/addgame" variant="contained" sx={{ml:'10px',mr:'20px',fontSize:'15px',backgroundColor:'#00ADB5'}} >
      Games
    </Button>
    <Button component={Link} to="/bookingAdmin" variant="contained" sx={{mr:'20px',fontSize:'15px',backgroundColor:'#00ADB5'}}>
      Booking
    </Button>
    <Button component={Link} to="/adminEvents" variant="contained" sx={{mr:'20px',fontSize:'15px',backgroundColor:'#00ADB5'}}>
      Event
    </Button>
    <Button component={Link} to="/usersTable" variant="contained" sx={{mr:'20px',fontSize:'15px',backgroundColor:'#00ADB5'}}>
      User Account
    </Button>

    <Button component={Link} to="/feedback" variant="contained" sx={{mr:'20px',fontSize:'15px',backgroundColor:'#00ADB5'}}>
      FeedBack
    </Button>
    </Box>
        <Button color="inherit"onClick={handleLogout} sx={{ml:'150px', backgroundColor: '#FF204E','&:hover': {
                      backgroundColor: '#f56a6a'
                    }, mr:'50px'}}>LogOut</Button>
      </Toolbar>
    </AppBar>

</Box>
  );
};

export default AdminAppBar;