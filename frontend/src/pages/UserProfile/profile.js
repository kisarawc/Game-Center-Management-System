import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import propic from '../../images/login/profile.png';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import axios from 'axios';

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
  // Add styles for the dialog container
  dialogContainer: {
    // Add your styles here
  },
  // Add styles for the dialog title
  dialogTitle: {
    // Add your styles here
  },
  // Add styles for the dialog content
  dialogContent: {
    // Add your styles here
  },
  // Add styles for the dialog actions
  dialogActions: {
    // Add your styles here
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: ''
  });

  useEffect(() => {
    fetchUser();
  }, []);

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
        // Populate form fields with fetched user data
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: '', // Assuming you don't fetch password for security reasons
          gender: response.data.gender
        });
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
  };

  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/updateUser/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // If the update is successful, fetch user data again to update the displayed info
        fetchUser();
        // Close the edit profile dialog
        handleEditProfileClose();
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
      <Dialog open={editProfileOpen} onClose={handleEditProfileClose} className={classes.dialogContainer}>
        <form onSubmit={handleEditProfileSubmit}> {/* Move onSubmit handler to the form */}
          <DialogTitle className={classes.dialogTitle}>Edit Profile</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {/* Edit Profile Form */}
            <div className={classes.editProfileForm}>
              <TextField name="username" label="Username" variant="outlined" value={formData.username} onChange={handleInputChange} />
              <TextField name="email" label="Email" variant="outlined" value={formData.email} onChange={handleInputChange} />
              <TextField name="password" label="Password" type="password" variant="outlined" value={formData.password} onChange={handleInputChange} />
              <TextField name="gender" label="Gender" variant="outlined" value={formData.gender} onChange={handleInputChange} />
              <TextField label="Join Date" variant="outlined" disabled />
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={handleEditProfileClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button> {/* Remove onClick from Save button */}
          </DialogActions>
        </form>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default ProfilePage;
