import React, { useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, TextField, Typography, MenuItem, Select } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const Paymentone = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { userid, bookid } = useParams();

    const [formData, setFormData] = useState({
        amount: '',
        time: '',
        date: '',
        payment_method: '',
        userID: userid,
        bookID: bookid
    });

    const { amount, time, date, payment_method, userID, bookID } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const paymentProcess = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!amount || !date || !payment_method) {
            setErrorMessage("Please fill all fields.");
            return; // Exit the function if any field is empty
        }

        try {
            // Clear any previous error messages
            setErrorMessage('');

            console.log(formData);

            const data = await axios.post(`http://localhost:3000/api/payments/createPayment`, formData);

            // Handle successful payment
        } catch (error) {
            console.log(error.message);
            // Handle error
        }
    }

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
                        <form onSubmit={paymentProcess}>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Typography variant="subtitle1" gutterBottom>
                                Date
                            </Typography>
                            <TextField id="date" variant="outlined" margin="normal" fullWidth type='date' name='date' value={date} onChange={handleInputChange} />
                            <TextField id="Amount" label="Amount" variant="outlined" margin="normal" fullWidth type='number' name='amount' value={amount} onChange={handleInputChange} />
                            {/* <TextField id="Time" label="Time" variant="outlined" margin="normal" fullWidth type='time' name='time' value={time} onChange={handleInputChange} /> */}
                            <Select name='payment_method' value={payment_method} onChange={handleInputChange}
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
                                <Button variant="contained" color="primary" type='submit'>
                                    Confirm Details
                                </Button>
                                <Link to="/paymentfour">
                                    <Button variant="contained" color="secondary">
                                        Add Card Details
                                    </Button>
                                </Link>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <Footer />
        </Box>
    );
};

export default Paymentone;
