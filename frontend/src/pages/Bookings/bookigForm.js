import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      {/* Text */}
      <Box sx={{ marginRight: '50px'}}>
        <Typography variant="h2" sx={{ marginBottom: '20px' }}>Booking Details</Typography>
        <Typography variant="body1">
          Please fill in the form below to make a booking. Ensure all fields are accurately filled.
        </Typography>
      </Box>
      
      {/* Form */}
      <Box sx={{ width: '400px', padding: '20px',textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px'}}>Booking Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="checkInDate"
            type="date"
            label="Check-in Date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.checkInDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="checkOutDate"
            type="date"
            label="Check-out Date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.checkOutDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>Book Now</Button>
        </form>
      </Box>
    </Box>
  );
};

export default BookingForm;
