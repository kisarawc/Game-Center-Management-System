import React from 'react';
import { Card, CardActionArea, CardContent, Button, Typography, Grid } from '@mui/material';
import AdminHeader from '../../../Components/common/adminHeader';

const Admin = () => {
  const handleButtonClick = (route) => {
    window.location.href = route;
  };

  const cardStyles = {
    backgroundColor: '#f3f3f3', 
    '&:hover': {
      backgroundColor: '#3e258f', 
    },
    marginBottom: '10px', 

    marginTop: '50px'
  };

  const buttonStyles = {
    backgroundColor: '#1976d2', 
    color: '#fff', 
    '&:hover': {
      backgroundColor: '#115293', 
    },
  };

  const backgroundImageStyle = {
    //backgroundImage: `url('https://wallpaperaccess.com/full/16676.jpg')`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundImageStyle}>
    <div>
      <AdminHeader/>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...cardStyles, backgroundColor: '#1b057d' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff' }}>
                  Games
                </Typography>
                <Button onClick={() => handleButtonClick('/addgame')} variant="contained" sx={buttonStyles}>Go to Games</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...cardStyles, backgroundColor: '#1b057d' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff' }}>
                  Events
                </Typography>
                <Button onClick={() => handleButtonClick('/adminEvents')} variant="contained" sx={buttonStyles}>Go to Events</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...cardStyles, backgroundColor: '#1b057d' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff' }}>
                  Bookings
                </Typography>
                <Button onClick={() => handleButtonClick('/BookingAdmin')} variant="contained" sx={buttonStyles}>Go to Bookings</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...cardStyles, backgroundColor: '#1b057d' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff' }}>
                  Reviews
                </Typography>
                <Button onClick={() => handleButtonClick('/reviews')} variant="contained" sx={buttonStyles}>Go to Reviews</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...cardStyles, backgroundColor: '#1b057d' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff' }}>
                  Accounts
                </Typography>
                <Button onClick={() => handleButtonClick('/usersTable')} variant="contained" sx={buttonStyles}>Go to Accounts</Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default Admin;
