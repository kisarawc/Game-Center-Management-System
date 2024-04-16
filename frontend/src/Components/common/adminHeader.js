import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';


const AdminAppBar = () => {
  return (
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
        <Button color="inherit">LogOut</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
