import React from 'react';
// Import Header and Footer from correct paths
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Payment = () => {
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
        {/* Heading */}
        <Typography variant="h1" sx={{ fontSize: '60px', marginTop: '40px' }}>Select what you want!</Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' , ml:'50px',mr:'250px', mt:'80px'}}>
          <Link to="/paymentfive">
              <Button variant="contained" sx={{ backgroundColor: '#663399', color: 'white', width: '150px', height: '50px', borderRadius: '30px', marginTop: '70px' }}>
                Do payments
              </Button>
            </Link>
            <Link to="/paymenttwo">  
            <Button variant="contained" sx={{ backgroundColor: '#663399', color: 'white', width: '150px', height: '50px', borderRadius: '30px', marginTop: '70px' }}>
              Details
            </Button>
            </Link>
            <Link to="/paymentthree">  
            <Button variant="contained" sx={{ backgroundColor: '#663399', color: 'white', width: '150px', height: '50px', borderRadius: '30px', marginTop: '70px' }}>
              Reports
            </Button>
            </Link>
          </Box>
          <Box sx={{ width: '550px', height: '400px', marginRight: '10px', mt:'100px' }}>
            <img src={'https://previews.123rf.com/images/papatonic/papatonic2303/papatonic230300043/199579790-young-gamer-sitting-at-desk-and-playing-online-video-games-ai-generated.jpg'} alt="Image description" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Payment;
