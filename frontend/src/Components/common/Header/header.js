import React from 'react';
import { AppBar, Box, Toolbar, Button, ThemeProvider, Divider } from '@mui/material';
import theme from '../../../styles/theme';
import { NavLink } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import log from '../../../images/header/logo.jpeg';

const Header = () => {
  const logoStyle = {
    width: '100px',
    height: '100px',
    marginRight: 'auto',
  };

  const getButton = () => ({
    variant: "outlined",
    sx: { ml: 10, color: 'white', borderRadius: '10px', fontSize: '1.1rem', padding: '10px 50px', boxShadow: '0 0 10px #05cff7' }
  });


  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right, #000000, #3e0f80,#000000ed)', boxShadow: '10' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 5, mr: 20 }}>
            <img
              src={log}
              style={logoStyle}
              alt="logo of sitemark"
            />
          </Box >

          <Button component={NavLink} to="/" {...getButton()} >Home</Button>
          <Button component={NavLink} to="/games" {...getButton()}>Games</Button>
          <Button component={NavLink} to="/book" {...getButton()} >Book</Button>
          <Button component={NavLink} to="/events" {...getButton()}>Events</Button>
          <Button component={NavLink} to="/Feedback" {...getButton()}>Feedback</Button>


          <Divider orientation="vertical" flexItem sx={{ ml: 20, width: 5, backgroundColor: 'purple', mr: 5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button variant='outlined' sx={{ width: '100px', mb: '8px', boxShadow: '0 0 8px #9605f7' }}>Register</Button>
            <Button variant='outlined' sx={{ width: '100px', boxShadow: '0 0 8px #9605f7' }}>Log in</Button>

          </Box>

          <AccountCircleOutlinedIcon sx={{ fontSize: '45px', color: 'white', ml: 2 }} />



        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
