import React, { useState, useEffect } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentFour = () => {
    const { userid, bookid, amount, date, payment_method } = useParams();
    const history = useNavigate();
    console.log(userid);
    const [formData, setFormData] = useState({
        card_no: '',
        name: '',
        cvv: '',
        expire_date: '',
        card_type: payment_method,
        user_id:userid
    });
    const [userName, setUserName] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const { card_no, name, cvv, expire_date, card_type } = formData;
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        // Fetch user details using userid when component mounts
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userid}`);
                // Assuming response.data contains user details
                console.log(response);
                setUserName(response.data.name);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchUserDetails();
    }, [userid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const CardSave = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                amount: amount,
                time: '', // Fill with appropriate value if needed
                date: date,
                payment_method: payment_method,
                userID: userid,
                bookID: bookid
            };
            const response = await axios.post('http://localhost:3000/api/card-payments/create', dataToSend);
            console.log(response);
            if (response.data.response_code === 200) {
                // Show success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: 'Your payment has been successfully processed.',
                    showConfirmButton: false,
                    timer: 2000 // Close after 2 seconds
                });
                // Update state to show Download Report button
                setPaymentCompleted(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // Function to handle redirection after downloading report
    const handleDownloadReport = () => {
        generateAndDownloadReport();
        // After downloading report, set redirecting state to true
        setRedirecting(true);
    };

    useEffect(() => {
        // Redirect to payment page after downloading report
        if (redirecting) {
            setTimeout(() => {
                history('/payment'); // Redirect to payment page
            }, 2000); // Redirect after 2 seconds
        }
    }, [redirecting, history]);

    const generateAndDownloadReport = () => {
        const doc = new jsPDF();
        doc.text(20, 20, 'Payment Report:');
        doc.text(`User: ${name}`, 20, 30); // Display user name in the report
        doc.text(`Amount: ${amount}`, 20, 40);
        doc.text(`Date: ${date}`, 20, 50);
        doc.text(`Payment Method: ${payment_method}`, 20, 60);
        doc.save('payment_report.pdf');

        // Clear form data after downloading report
        setFormData({
            card_no: '',
            name: '',
            cvv: '',
            expire_date: '',
            card_type: payment_method,
            user_id: userid
        });
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
                        <form>
                            <TextField id="card_no" label="Card No" variant="outlined" margin="normal" fullWidth type='text' name='card_no' value={card_no} onChange={handleInputChange} />
                            <TextField id="name" label="Name" variant="outlined" margin="normal" fullWidth type='text' name='name' value={name} onChange={handleInputChange} />
                            <TextField id="cvv" label="CVV" variant="outlined" margin="normal" fullWidth type='text' name='cvv' value={cvv} onChange={handleInputChange} />
                            <TextField id="expire_date" label="Expire Date" variant="outlined" margin="normal" fullWidth type='date' name='expire_date' value={expire_date} onChange={handleInputChange} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                <Button variant="contained" color="primary" >
                                    Confirm Details
                                </Button>
                                {!paymentCompleted && (
                                    <Button variant="contained" color="secondary" onClick={CardSave}>
                                        Pay
                                    </Button>
                                )}
                                {paymentCompleted && (
                                    <Button variant="contained" color="secondary" onClick={generateAndDownloadReport}>
                                        Download Report
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            <Footer />
        </Box>
    );
};

export default PaymentFour;
