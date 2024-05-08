import React, { useEffect, useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, Typography ,TextField} from '@mui/material'; // Remove unused imports
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PaymentThree = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [card, setCard] = useState({});
  const [formattedDate, setFormattedDate] = useState('');
  const history = useNavigate();

  useEffect(() => {
    async function fetchCardDetails() {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/card-payments/getcardDetail/${userId}`);
        
        if (!response.data || Object.keys(response.data).length === 0) {
          Swal.fire({
            title: 'No Card Details Found',
            text: 'Redirecting to payment page...',
            icon: 'warning',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: false,
            showCloseButton: false,
          }).then(() => {
            history('/payment');
          });
          return;
        }

        setCard(response.data);
        console.log(card._id);

        const date = new Date(response.data.expire_date);
        const formattedDate = date.toISOString().substr(0, 10); // Format date as YYYY-MM-DD
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    }

    fetchCardDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });

    if (name === 'expire_date') {
      setFormattedDate(value);
    }
  };

  const CardUpdate = async (e) => {
    e.preventDefault();
    
    try {
      console.log(card);
      await axios.put(`http://localhost:3000/api/card-payments/update/${card._id}`, card);
      Swal.fire('Success!', 'Card details have been updated.', 'success');
    } catch (error) {
      console.log(error.message);
      Swal.fire('Error!', 'Failed to update card details.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the card details. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });
  
      if (shouldDelete.isConfirmed) {
        const userId = sessionStorage.getItem('userId');
        await axios.delete(`http://localhost:3000/api/card-payments/delete/${card._id}`);
        setCard({});
        setFormattedDate('');
        document.getElementById('card-number').value = '';
        document.getElementById('card-holder-name').value = '';
        document.getElementById('exp-date').value = '';
  
        Swal.fire('Deleted!', 'Card details have been deleted.', 'success');
        history('/payment');
      }
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
                <form>
                  <Typography variant="subtitle1" gutterBottom>
                    Card Number
                  </Typography>
                  <TextField id="card-number" variant="outlined" margin="normal" fullWidth name="card_no" value={card.card_no} onChange={handleInputChange} />
                  <Typography variant="subtitle1" gutterBottom>
                    Card Holder's Name:
                  </Typography>
                  <TextField id="card-holder-name" variant="outlined" margin="normal" fullWidth name="name" value={card.name} onChange={handleInputChange} />
                  <TextField id="exp-date" type="date" variant="outlined" margin="normal" fullWidth name="expire_date" value={formattedDate} onChange={handleInputChange} />
                  {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <Button variant="contained" color="primary" type="submit" onClick={CardUpdate} >
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
