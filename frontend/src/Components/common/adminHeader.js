import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Grid, Box, Link } from '@mui/material';

const handleLogout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  window.location.href='/login';
};

const AdminAppBar = () => {
  return (
<Box>
    <AppBar position="static">
      <Toolbar sx={{backgroundColor:'#6d4af6'}}>
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

        <Button color="inherit"onClick={handleLogout} sx={{'&:hover': {
                      backgroundColor: '#f56a6a'
                    }}}>LogOut</Button>
      </Toolbar>
    </AppBar>

</Box>
  );
};

export default AdminAppBar;
