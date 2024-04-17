import React from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box , Button, Card, CardContent, TextField, Typography } from '@mui/material';



const PaymentFour = () => {
  const handleSubmit = () => {
    // Handle submit logic
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
        <br />
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Card Details
            </Typography>
            <TextField id="card_no" label="Card No" variant="outlined" margin="normal" fullWidth type='text' />
            <TextField id="name" label="Name" variant="outlined" margin="normal" fullWidth type='text' />
            <TextField id="cvv" label="CVV" variant="outlined" margin="normal" fullWidth type='text' />
            <TextField id="expire_date" label="Expire Date" variant="outlined" margin="normal" fullWidth type='date' /> 
            <Typography color="error">Your error message here</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Confirm Details
              </Button>
              <Button variant="contained" color="secondary">
                Pay 
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaymentFour;
