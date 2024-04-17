import React, { useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, TextField, Typography, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';

const Paymentone = () => {
    const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state
    
    // Handler for handling form submission
    const handleSubmit = () => {
        // Get the values of the form fields
        const Amount = document.getElementById('Amount').value;
        const Time = document.getElementById('Time').value;
        const date = document.getElementById('date').value;

        // Check if any of the fields is empty
        if (!Amount || !Time || !date) {
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
                <br />
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Payment Details
                        </Typography>
                        
                        <TextField id="Amount" label="Amount" variant="outlined" margin="normal" fullWidth type='Number'/>
                        <TextField id="Time" label="Time" variant="outlined" margin="normal" fullWidth type='time' />
                        <TextField id="date" label="Date" variant="outlined" margin="normal" fullWidth type='date' />
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
                        
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Confirm Details
                            </Button>
                            <Link to="/paymentfour">
                            <Button variant="contained" color="secondary">
                               Add Card Details
                            </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Footer />
        </Box>
    );
};
    
export default Paymentone;
