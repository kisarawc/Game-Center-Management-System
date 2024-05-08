import React, { useState } from 'react';
import { Typography, Button, Container, Box, CssBaseline, Paper, TextField, Grid, RadioGroup, Radio, FormControlLabel, Checkbox, FormLabel, InputAdornment } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signupBackground from '../../images/login/signup.jpg';
import sriLankaFlag from '../../images/login/flag.jpg'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const SignUp = () => {
  const initialFormState = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    bDate: '',
    phoneNumber: '',
    agreed: false
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the password and confirm password fields match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // Check if the birth date is in the future
    const currentDate = new Date();
    const birthDate = new Date(formData.bDate);
    if (birthDate > currentDate) {
      toast.error("Please enter a valid birth date");
      return;
    }

    // Check if the email is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/createUser', formData);
      console.log('New user created:', response.data);

      if (response.status === 201) {
        toast.success('You have successfully registered!');
        window.location.href = '/login';
      }
      else {
        toast.error(`Error : ${response.data.message}`);
      }

    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('An error occurred while submitting the registration form. Please try again later');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <Box>
      <Header />
      <div style={{ backgroundImage: `url(${signupBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: 'calc(100vh - 200px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Container component="main" maxWidth="sm" style={{ marginTop: '60px', marginBottom: '60px' }}> {/* Adjust margin top */}
          <CssBaseline />
          <Paper style={{ padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={sriLankaFlag} alt="Sri Lanka Flag" style={{ width: '20px', marginRight: '4px' }} />
                          +94
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="bDate"
                    label="Birth Day"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.bDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="agreed" checked={formData.agreed} onChange={handleCheckboxChange} />}
                    label="I agree to the terms and conditions"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ mt: 2, color: 'white', backgroundColor: '#05cff7' }}
                type="submit"
                fullWidth
                disabled={!formData.agreed}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
                <Grid item>
                  <NavLink to="/login" variant="body2" style={{ color: '#05cff7', textDecoration: 'none' }}>
                    Already have an account? Log In
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Footer />
    </Box>
  );
};

export default SignUp;
