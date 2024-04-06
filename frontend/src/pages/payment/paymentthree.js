import React, { useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material'; // Import Card from '@mui/material'

const PaymentThree = () => { // Rename function to start with an uppercase letter
  const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state
    
  // Handler for handling form submission
  const handleSubmit = () => {
      // Get the values of the form fields
      const cardNumber = document.getElementById('card-number').value;
      const cardHolderName = document.getElementById('card-holder-name').value;
      const expDate = document.getElementById('exp-date').value;

      // Check if any of the fields is empty
      if (!cardNumber || !cardHolderName || !expDate) {
          setErrorMessage('Please fill out all required fields.');
          return;
      }

      // Proceed with form submission logic
  };
  
  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginLeft: '50px', marginRight: '250px', marginTop: '80px' }}>
            <Typography>Wanna play more!</Typography>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Card Details
                </Typography>
                <Select
                  sx={{
                    marginTop: 5,
                    width: 250,
                    height: 50,
                  }}
                >
                  <MenuItem value={1}>Debit</MenuItem>
                  <MenuItem value={2}>Credit</MenuItem>
                </Select>
                <TextField id="card-number" label="Card Number" variant="outlined" margin="normal" fullWidth />
                <TextField id="card-holder-name" label="Card Holder's Name" variant="outlined" margin="normal" fullWidth />
                <TextField id="exp-date" label="Exp-Date" variant="outlined" margin="normal" fullWidth />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Confirm Details
                  </Button>
                  <Button variant="contained" color="secondary">
                    Pay $25
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: '550px', height: '400px', marginRight: '10px', mt: '100px' }}>
            <img src={'https://previews.123rf.com/images/papatonic/papatonic2303/papatonic230300043/199579790-young-gamer-sitting-at-desk-and-playing-online-video-games-ai-generated.jpg'} alt="Image description" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaymentThree;
