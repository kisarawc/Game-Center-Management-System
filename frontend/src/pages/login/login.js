import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Button, Grid, Link, Paper, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginBackground from '../../images/login/login.jpg';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/login', { email, password })
      .then(response => {
        if (response.status === 200) {
          const { userId, token } = response.data;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId);

          // Redirect based on user role or any other condition
          if (email === 'chathuka@gmail.com' && password === 'chathuka123') {
            window.location.href = '/bookingAdmin';
          } else if (email === 'limasha@gmail.com' && password === 'limasha123') {
            window.location.href = '/bookingAdmin';
          } else if (email === 'ravindu@gmail.com' && password === 'ravindu123') {
            window.location.href = '/bookingAdmin';
          } else if (email === 'radeesa@gmail.com' && password === 'radeesa123') {
            window.location.href = '/bookingAdmin';
          } else if (email === 'saniru@gmail.com' && password === 'saniru123') {
            window.location.href = '/adminDashboard';
          } else if (email === 'shavindi@gmail.com' && password === 'shavindi123') {
            window.location.href = '/adminDashboard';
          } else {
            window.location.href = `/profile`;
            toast.success('Successfully logged in to the system');
          }
        } else {
          throw new Error(response.data.message || 'Unauthorized');
        }
      })
      .catch(err => {
        console.error(err);
        const errorMessage = err.response ? err.response.data.message : 'Unauthorized';
        toast.error(`Error: ${errorMessage}`);
      });
  }

  const getButton = () => ({
    variant: "outlined",
    sx: {
      ml: 10,
      color: 'white',
      borderRadius: '10px',
      fontSize: '1.1rem',
      padding: '10px 50px',
      boxShadow: '0 0 10px #05cff7'
    }
  });

  return (
    <Box>
      <Header />
      <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                </Button>
                <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
                  <Grid>
                    <Link component={NavLink} to="/forgetpsswrd" variant="body2">
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
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </Box>
  );
};

export default Login;
