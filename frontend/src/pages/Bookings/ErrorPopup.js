import React from 'react';
import { Modal, Paper, Typography, Button, Box } from '@mui/material';

const ErrorPopup = ({ open, message, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url('https://thearcadewarehouse.co.uk/wp-content/uploads/2020/01/Hero-3.png')`,
          backgroundSize: 'cover',
          width: '50%',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //justifyContent: 'center',
          padding: '20px',
        }}
      >
        
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#e67efe', mt:'100px'}}>
            Error Creating Booking
          </Typography>
          <Typography variant="h6" sx={{color:'#ffffff',mt:'30px'}}gutterBottom>
          💢 {message}
          </Typography>
          <Button variant="contained" sx={{mt:'80px' , backgroundColor: '#534890' ,'&:hover': {
      backgroundColor: '#50318e', 
    },}}onClick={onClose}>
            Back
          </Button>
        
      </Box>
    </Modal>
  );
};

export default ErrorPopup;
