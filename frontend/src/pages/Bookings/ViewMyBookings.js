import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const ViewMyBookings = ({ onViewMyBookings }) => {
  const handleViewMyBookings = () => {
    axios.get('/api/my-bookings')
      .then(response => {
        onViewMyBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleViewMyBookings}>
      View My Bookings
    </Button>
  );
};

export default ViewMyBookings;
