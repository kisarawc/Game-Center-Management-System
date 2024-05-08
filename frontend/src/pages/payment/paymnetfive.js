import React, { useEffect, useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import Box from '@mui/material/Box';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Paymentfive = () => {
    const [booking,setBooking] =useState([]);
    const [amount,setAmount]=useState(); 
  // Dummy data for demonstration
//   const rows = [
//     { id: 1, date: '2024-04-17', start: '10:00 AM', duration: '2 hours', messageRequests: 3, userId: 'ABC123', gameName: 'Chess', status: 'Pending', numOfPlayers: 4 },
//     { id: 2, date: '2024-04-18', start: '3:00 PM', duration: '1 hour', messageRequests: 2, userId: 'XYZ456', gameName: 'Checkers', status: 'Paid', numOfPlayers: 2 },
//     // Add more rows as needed
//   ];

useEffect(() => {
  const userId = sessionStorage.getItem('userId');
        console.log("User ID:", userId);
        
        console.log(userId);
        async function getBookingDetails() {
          try {
           const response = await axios.get(`http://localhost:3000/api/bookings/user/${userId}`);
            //const response = await axios.get('http://localhost:3000/api/bookings');

            console.log(response.data); // Log the response data
            setBooking(response.data);
            setAmount(response.data.fee);
          } catch (error) {
            console.error('Error fetching bookings:', error);
          }
        }
    getBookingDetails();
  }, []);
  


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
        <TableContainer component={Paper} style={{ marginTop: '20px', maxWidth: '90%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Message Requests</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>Game Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Number of Players</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking && booking.map((row) => (
                
                <TableRow key={row._id}>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(row.start_time).toLocaleTimeString("en-US", { timeZone: "Asia/Colombo" })}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.message_request}</TableCell>
                  <TableCell>{row.user_id}</TableCell>
                  <TableCell>{row.game_name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.num_players}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">  <Link to={`/paymentone/${row.user_id}/${row._id}/${row.fee}`} style={{ color: 'white', textDecoration: 'none' }}>
                Do Payment
            </Link></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
  );
  
};

export default Paymentfive;
