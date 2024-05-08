import React, { useState, useEffect } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, TextField, Typography, MenuItem, Select } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Paymentone = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { bookid ,fee } = useParams();
    const [paymentData, setPaymentData] = useState('');
    const [formData, setFormData] = useState({
        amount: fee,
        time: '',
        date: '',
        payment_method: '',
        userID: '', // Initialize as empty string
        bookID: bookid
    });
    const history = useNavigate();

    const { amount, time, date, payment_method, userID, bookID } = formData;

    useEffect(() => {
        // Retrieve user ID from session storage
        const userId = sessionStorage.getItem('userId');
        setFormData(prevState => ({
            ...prevState,
            userID: userId
        }));
    }, []); // Run only once on component mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const paymentProcess = async (e) => {
        e.preventDefault();

        if (!amount || !date || !payment_method) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            setErrorMessage('');
            // set paymentData state with form data
            setPaymentData(formData);

            const data = await axios.post(`http://localhost:3000/api/payments/createPayment`, formData);
            history(`/paymentfour/${userID}/${bookid}/${amount}/${date}/${payment_method}`);

            // Handle successful payment
        } catch (error) {
            console.log(error.message);
            // Handle error
        }
    }

    console.log(userID);

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
                            <Select
                                name='payment_method' // Name of the select field
                                value={payment_method} // Current selected value
                                onChange={handleInputChange} // Handle change function
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
                                <Button variant="contained" color="secondary" type='submit'>
                                    Add Card Details
                                </Button>
                                {/* <Link to="/paymentfour">
                                    <Button variant="contained" color="secondary">
                                        Add Card Details
                                    </Button>
                                </Link> */}
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            {/* Pass paymentData as prop to PaymentFour */}
            <Footer />
        </Box>
    );
};

export default Paymentone;
