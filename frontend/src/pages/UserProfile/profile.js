import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
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
  editProfileForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };

  const handleEditProfileSubmit = () => {
    // Submit edited profile details to backend
    // ...
    // Close edit profile dialog
    handleEditProfileClose();
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
          padding: '16px',
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
          <Grid container spacing={2} justifyContent="center" className={classes.profileActions}>
            <Grid item xs={12} sm={6}> 
              <Button fullWidth variant="contained" color="primary" onClick={handleEditProfileOpen}>Edit Profile</Button>
            </Grid>
            <Grid item xs={12} sm={6}> 
              <Button fullWidth variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            </Grid>
          </Grid>
        </div>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onClose={handleEditProfileClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* Edit Profile Form */}
          <form className={classes.editProfileForm} onSubmit={handleEditProfileSubmit}>
            <TextField label="Username" variant="outlined" />
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" type="password" variant="outlined" />
            <TextField label="Gender" variant="outlined" />
            <TextField label="Join Date" variant="outlined" disabled />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditProfileClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditProfileSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default ProfilePage;
