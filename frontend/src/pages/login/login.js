//login

import React from 'react';
import { Container, Typography, TextField, Button, Grid, Link, Paper, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';
import loginBackground from '../../images/login/login.jpg';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getButton = () => ({
    variant: "outlined",
    sx: { ml: 10 ,color: 'white' , borderRadius: '10px',fontSize:'1.1rem',padding:'10px 50px' , boxShadow: '0 0 10px #05cff7'}
  });

  return (
    <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', height: '100vh', width: '221.9vh', display: 'flex', justifyContent: 'center', alignItems: 'center' , marginLeft: -24}}>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper style={{ marginTop: '64px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Log In
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
            />
            <Button 
              component={NavLink} to="/profile" {...getButton()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '24px 0px 16px' }}
            >
              Sign In
            </Button >
            <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
              <Grid>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: '8px' }}>
              <Grid>
                <Link component={NavLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
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

export default Login;
