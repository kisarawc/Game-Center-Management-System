import React from 'react';
import { Typography, Button, Container, CssBaseline, Paper, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import signupBackground from '../../images/login/signup.jpg';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getButton = () => ({
    variant: "outlined",
    sx: { ml: 10 ,color: 'white' , borderRadius: '10px',fontSize:'1.1rem',padding:'10px 50px' , boxShadow: '0 0 10px #05cff7'}
  });

  return (
    <div style={{ backgroundImage: `url(${signupBackground})`, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper style={{ marginTop: '5px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px'}}>
            Sign Up
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <Button
              component={NavLink} to="/login" {...getButton()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0px 16px' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
              <Grid>
                <Link component={NavLink} to="/login" variant="body2" color="primary">
                  Already have an account? Log In
                </Link>
              </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;