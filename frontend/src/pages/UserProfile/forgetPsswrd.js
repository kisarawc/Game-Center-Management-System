import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, CssBaseline, Grid, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { toast } from 'react-toastify';
import profileBackground from '../../images/login/profile.jpg';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/sendLink', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("Invalid User");
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box style={{ backgroundImage: `url(${profileBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Header />
      <div style={{ height: '59vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              Forgot Password
            </Typography>
            {message ? (
              <Typography variant="body1" style={{ marginBottom: '16px', textAlign: 'center' }}>
                Message sent to your email. Please check your inbox.
              </Typography>
            ) : (
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, color: 'white', backgroundColor: '#05cff7' }}
                >
                  Send OTP
                </Button>
              </form>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2" style={{ color: '#05cff7', textDecoration: 'none' }}>
                  Remembered your password? Log In
                </NavLink>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
      <Footer />
    </Box>
  );
};

export default ForgetPasswordPage;
