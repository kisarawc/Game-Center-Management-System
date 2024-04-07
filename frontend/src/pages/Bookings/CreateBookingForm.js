// CreateBooking.js
import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const CreateBooking = ({ onCreateBooking }) => {
  const handleCreateBooking = () => {
    axios.post('/api/bookings', {/* Booking data */})
      .then(response => {
        // Handle success
        onCreateBooking();
      })
      .catch(error => {
        // Handle error
        console.error('Error creating booking:', error);
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleCreateBooking}>
      Create New Booking
    </Button>
  );
};

export default CreateBooking;
