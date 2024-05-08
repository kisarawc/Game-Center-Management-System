import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import propic from '../../images/login/profile.png';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import axios from 'axios';
import profileBackground from '../../images/login/profile.jpg';

const useStyles = makeStyles((theme) => ({
  profilePage: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  profileBackground: {
    backgroundImage: `url(${profileBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  profileBox: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    maxWidth: 600,
    width: '100%',
    margin: '0 auto',
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
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
  editProfileForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  dialogContainer: {
    '& .MuiDialog-paper': {
      minWidth: '300px', 
      padding: theme.spacing(3), 
    },
  },

  dialogTitle: {
    color: 'darkblue',
    padding: theme.spacing(2), 
    textAlign: 'center', 
    fontSize: '5rem',
  },

  dialogContent: {
    padding: theme.spacing(2), 
  },

  dialogActions: {
    justifyContent: 'center', 
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default, 
  },
  profileButton: {
    width: '50%', // Decrease button width
    marginBottom: theme.spacing(1), // Add some space between buttons
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    gender: '',
    phoneNumber:'',
    bDate: ''
  });
  const [authenticated, setAuthenticated] = useState(true); // Track authentication status

  useEffect(() => {
    fetchUser();
  }, [authenticated]); // Fetch user data whenever authentication status changes

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`           
        }
      });
      console.log(response)
      if (response.status === 200) {
        const storedUserId = sessionStorage.getItem('userId');
        console.log(storedUserId);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          gender: response.data.gender,
          phoneNumber: response.data.phoneNumber,
          bDate: response.data.bDate.split('T')[0] // Extracting only the date part
        });
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/updateUser/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        fetchUser();
        handleEditProfileClose();
        toast.success('Profile updated successfully');
        setAuthenticated(false); // Force reauthentication
      } else {
        console.error('Error updating user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

  const getAvatar = () => {
    if (formData.gender === 'Male') {
      return maleAvatar;
    } else {
      return femaleAvatar;
    }
  };

  return (
    <Box>
      <Header />
      <div className={`${classes.profilePage} ${classes.profileBackground}`}>
        <Box className={classes.profileBox}>
          <Typography variant="h4" gutterBottom className={classes.cursiveText}>{`Hi   ${user.username ? user.username.toUpperCase() : ''} 👋`}</Typography>
          <div className={classes.profileInfo}>
            <Avatar alt="Profile" src={getAvatar()} className={classes.largeAvatar} /> {/* Render avatar dynamically */}
            <div className={classes.userDetails}>
              <Typography variant="body1" className={`${classes.formInput}`}>Name: {user.name || ''}</Typography>
              <Typography variant="body1" className={`${classes.formInput}`}>Username: {user.username || ''}</Typography>
              <Typography variant="body1" className={`${classes.formInput}`}>Email: {user.email || ''}</Typography>
              <Typography variant="body1" className={`${classes.formInput}`}>Phone Number: {formData.phoneNumber || ''}</Typography>
              <Typography variant="body1" className={`${classes.formInput}`}>Gender: {user.gender || ''}</Typography>
              <Typography variant="body1" className={`${classes.formInput}`}>Birth Day: {formData.bDate || ''}</Typography>
            </div>
            <Grid container spacing={2} justifyContent="center" className={classes.profileActions}>
              <Grid item xs={12} sm={6}> 
                <Button fullWidth variant="contained" color="primary" onClick={handleEditProfileOpen} className={classes.profileButton}>Edit Profile</Button>
              </Grid>
              <Grid item xs={12} sm={6}> 
                <Button fullWidth variant="contained" color="secondary" onClick={handleLogout} className={classes.profileButton}>Logout</Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
      <Dialog open={editProfileOpen} onClose={handleEditProfileClose} className={classes.dialogContainer}>
        <form onSubmit={handleEditProfileSubmit}>
          <DialogTitle className={classes.dialogTitle}>Edit Profile</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <div className={classes.editProfileForm}>
              <TextField name="name" label="Name" variant="outlined" value={formData.name} onChange={handleInputChange} />
              <TextField name="username" label="Username" variant="outlined" value={formData.username} onChange={handleInputChange} />  
              <TextField name="email" label="Email" variant="outlined" value={formData.email} onChange={handleInputChange} />
              <TextField name="gender" label="Gender" variant="outlined" value={formData.gender} onChange={handleInputChange} />
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={handleEditProfileClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Footer />
    </Box>
  );
};

export default ProfilePage;
