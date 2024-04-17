//SIGNUP
import React, { useState } from 'react';
import { Typography, Button, Container, CssBaseline, Paper, TextField, Grid, RadioGroup, Radio, FormControlLabel, Checkbox, FormLabel } from '@mui/material'; 
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import signupBackground from '../../images/login/signup.jpg';

const SignUp = () => {
  const initialFormState = {
    name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    joinDate: '',
    agreed: false
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/createUser', formData);
      console.log('New user created:', response.data);

      if(response.status === 201){
        window.alert('You have successfully registered!');
        window.location.href = '/login';
      } 
      else {
        window.alert(`Error : ${response.data.message}`);
      }

    } catch (error) {
      console.error('Error creating user:', error);
      window.alert('An error occurred while submitting the registration form. Please try again later');
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
    <div style={{ backgroundImage: `url(${signupBackground})`, backgroundSize: 'cover', height: '150vh', width:'219vh', display: 'flex', justifyContent: 'center', alignItems: 'center' ,  marginLeft: -24}}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
              Sign Up
            </Typography>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
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
                value={formData.password}
                onChange={handleChange}
              />
              <Grid container spacing={2}>
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
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="joinDate"
                label="Join Date"
                type="date"
                id="joinDate"
                InputLabelProps={{ shrink: true }}
                value={formData.joinDate}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox name="agreed" checked={formData.agreed} onChange={handleCheckboxChange} />}
                label="I agree to the terms and conditions"
                style={{ marginTop: '16px' }}
              />
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
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
