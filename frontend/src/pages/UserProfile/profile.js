import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar, Grid, Box } from '@material-ui/core';
import propic from '../../images/login/profile.png';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const useStyles = makeStyles((theme) => ({
  profilePage: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  userDetails: {
    marginTop: theme.spacing(2),
  },
  profileActions: {
    marginTop: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div className={classes.profilePage}>
          <Typography variant="h4" gutterBottom>{`Hi, ${user.name || ''} 👋`}</Typography>
          <div className={classes.profileInfo}>
            <Avatar alt="Profile" src={propic} className={classes.largeAvatar} />
            <div className={classes.userDetails}>
              <Typography variant="body1">Username: {user.username || ''}</Typography>
              <Typography variant="body1">Email: {user.email || ''}</Typography>
              <Typography variant="body1">Password: {user.password || ''}</Typography>
              <Typography variant="body1">Gender: {user.gender || ''}</Typography>
              <Typography variant="body1">Join Date: {user.joinDate || ''}</Typography>
            </div>
          </div>
          <Grid container spacing={2} justify="center" className={classes.profileActions}>
            <Grid item>
              <Button variant="contained" color="primary">Edit Profile</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProfilePage;
