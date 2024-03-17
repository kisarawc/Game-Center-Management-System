import React from 'react';
import { AppBar, Box, Toolbar, Button, ThemeProvider, Divider} from '@mui/material';
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
    size: 'large',
    sx: { ml: 10 ,color: 'white' , borderRadius: '10px' ,  fontSize: '1.09rem'}
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right, #000000, #3e0f80,#000000ed)', boxShadow: '10'}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 5, mr:20}}>
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

      
          <Divider orientation="vertical" flexItem sx={{ml: 30,width: 5, backgroundColor: 'purple', mr: 10}} />
           <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <Button variant='outlined' sx={{width:'100px' , mb:'8px'}}>Register</Button>
            <Button variant='outlined' sx={{width:'100px'}}>Log in</Button>

          </Box>
          
            <AccountCircleOutlinedIcon  sx={{ fontSize: '45px', color:'white' , ml:5}}/> 
          
         
        
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
} 
export default Header;
