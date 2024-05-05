import React, { useState } from 'react';
import { Typography, Button, Box, Container, CssBaseline, Paper, TextField, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const generateOTP = () => {
    // Generate a random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    return otpCode.toString();
  };

  const sendOTP = async () => {
    const generatedOtp = generateOTP();

    try {
      // Send the OTP to the user's email using your backend API
      await axios.post('http://localhost:5000/api/users/sendOTP', { email, otp: generatedOtp });
      setOtp(generatedOtp);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error, display a message to the user, etc.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOTP();
  };

  const handleVerifyOTP = () => {
    // Logic to verify the entered OTP against the generated OTP
    // For simplicity, let's assume the entered OTP is correct
    setOtpVerified(true);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box style={{ backgroundColor: '#311465' }}>
      <Header />
      <div style={{ height: '59vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              Forgot Password
            </Typography>
            {otpVerified ? (
              <Typography variant="body1" style={{ marginBottom: '16px', textAlign: 'center' }}>
                OTP verified successfully. You can now reset your password.
              </Typography>
            ) : otpSent ? (
              <form style={{ width: '100%' }} onSubmit={handleVerifyOTP}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  autoComplete="off"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, color: 'white', backgroundColor: '#05cff7' }}
                >
                  Verify OTP
                </Button>
              </form>
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

export default ForgotPassword;
