import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';

const AdminAppBar = () => {

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, session data, etc.)
    // For now, let's assume you're clearing sessionStorage
    sessionStorage.clear();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#6d4af6' }}>
        <IconButton
          size="large"
          edge="start"
          color="#6d4af6"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GG LOUNGE
        </Typography>

        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        {/* Use NavLink for navigation to the login page */}
        <Button color="inherit" component={NavLink} to="/login" onClick={handleLogout}>LogOut</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
