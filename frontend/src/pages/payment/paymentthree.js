import React, { useEffect, useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material'; // Import Card from '@mui/material'
import axios from 'axios';

const PaymentThree = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [card, setCard] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/card-payments`);
        console.log(response.data);
        setCard(response.data);

        // Format the date
        const date = new Date(response.data.expire_date);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const CardSave = async (e) => {
    e.preventDefault();

    try {
      console.log(card);
      const data = await axios.patch(`http://localhost:3000/api/card-payments`, card);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/card-payments`);
      setCard([]); 
      setFormattedDate('');
    } catch (error) {
      console.log(error.message);
    }
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
            <Typography sx={{ fontSize: 30, marginTop: 0.5, marginBottom: 5 }}>Wanna play more!</Typography>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Card Details
                </Typography>
                <form onSubmit={CardSave}>
                <Typography variant="subtitle1" gutterBottom>
                                Card Number
                  </Typography>
                  <TextField id="card-number"  variant="outlined" margin="normal" fullWidth name="card_no" value={card.card_no} onChange={handleInputChange} />
                  <Typography variant="subtitle1" gutterBottom>
                                Card Holder's Name:
                  </Typography>
                  <TextField id="card-holder-name"  variant="outlined" margin="normal" fullWidth name="name" value={card.name} onChange={handleInputChange} />
                  <TextField id="exp-date" label="Exp-Date" variant="outlined" margin="normal" fullWidth name="expire_date" value={formattedDate} onChange={handleInputChange} />
                  {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Button variant="contained" color="primary" type="submit" >
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: '550px', height: '400px', marginRight: '10px', mt: '100px' }}>
            <img src={'https://previews.123rf.com/images/papatonic/papatonic2303/papatonic230300043/199579790-young-gamer-sitting-at-desk-and-playing-online-video-games-ai-generated.jpg'} alt="Image description" style={{ maxWidth: '130%', maxHeight: '130%', width: '150', height: '150', objectFit: 'cover' }} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default PaymentThree;
