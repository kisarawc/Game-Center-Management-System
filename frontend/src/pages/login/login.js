import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Link, Paper, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';
import loginBackground from '../../images/login/login.jpg';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/login', { email, password })
    .then(result => {
      if (result.status === 200) {
        window.alert('You have successfully logged in!');
        const { token, userId } = result.data;
        sessionStorage.setItem('token', token); // Store token in sessionStorage
        sessionStorage.setItem('userId', userId); // Store userId in sessionStorage
        // Redirect based on user role or any other condition
        if (email === 'chathuka@gmail.com' && password === 'chathuka123') {
          window.location.href = '/adminDashboard';
        } 
        else {
          window.location.href = '/profile';
        }
      } else {
        throw new Error(result.data.message || 'Unauthorized'); // Throw an error with a default message
      }
    })
    .catch(err => {
      console.error(err);
      const errorMessage = err.response ? err.response.data.message : 'Unauthorized';
      window.alert(`Error: ${errorMessage}`); // Display the error message in an alert box
    });
  }

  const getButton = () => ({
    variant: "outlined",
    sx: { ml: 10, color: 'white', borderRadius: '10px', fontSize: '1.1rem', padding: '10px 50px', boxShadow: '0 0 10px #05cff7' }
  });

  return (
    <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: -24 }}>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                {...getButton()}
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
