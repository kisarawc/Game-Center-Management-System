import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar, Grid , Box} from '@material-ui/core';
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

  const handleLogout = () => {
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
        <Typography variant="h4" gutterBottom>{`Hi, John Doe 👋`}</Typography>
        <div className={classes.profileInfo}>
          <Avatar alt="Profile" src={propic} className={classes.largeAvatar} />
          <div className={classes.userDetails}>
            <Typography variant="body1">Email: johndoe@example.com</Typography>
            <Typography variant="body1">Location: New York, USA</Typography>
            <Typography variant="body1">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
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
}

export default ProfilePage;
