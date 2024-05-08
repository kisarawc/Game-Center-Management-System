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
        user_id: userid
    });
    const [userName, setUserName] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [errors, setErrors] = useState({
        card_no: false,
        name: false,
        cvv: false,
        expire_date: false
    });

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
        let newValue = value;

        // Validation for card number: Allow only digits and trim leading/trailing spaces
        if (name === 'card_no') {
            newValue = value.replace(/\s/g, ''); // Remove spaces
            newValue = newValue.slice(0, 16); // Limit to 16 characters
        }

        // Validation for name: Trim leading/trailing spaces
        if (name === 'name') {
            newValue = value.trim();
        }

        // Validation for CVV: Allow only digits and limit to 3 characters
        if (name === 'cvv') {
            newValue = value.replace(/\D/g, ''); // Remove non-digit characters
            newValue = newValue.slice(0, 3); // Limit to 3 characters
        }

        // For expiration date, no specific validation required

        setFormData({ ...formData, [name]: newValue });
    };

    const validateForm = () => {
        let formValid = true;
        const newErrors = {};

        // Check if any field is empty
        if (!card_no || !name || !cvv || !expire_date) {
            formValid = false;
            newErrors.card_no = !card_no;
            newErrors.name = !name;
            newErrors.cvv = !cvv;
            newErrors.expire_date = !expire_date;
        }

        setErrors(newErrors);
        return formValid;
    };

    const CardSave = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // If form is not valid, return early
            return;
        }

        try {
            const dataToSend = {
                card_no: card_no,
                name: name,
                cvv: cvv,
                expire_date: expire_date,
                user_id: userid,
            };

            // Add further validation as needed before sending the request

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
                            <TextField id="card_no" label="Card No" variant="outlined" margin="normal" fullWidth type='text' name='card_no' value={card_no} onChange={handleInputChange} error={errors.card_no} helperText={errors.card_no && "Card number is required"} />
                            <TextField id="name" label="Name" variant="outlined" margin="normal" fullWidth type='text' name='name' value={name} onChange={handleInputChange} error={errors.name} helperText={errors.name && "Name is required"} />
                            <TextField id="cvv" label="CVV" variant="outlined" margin="normal" fullWidth type='text' name='cvv' value={cvv} onChange={handleInputChange} error={errors.cvv} helperText={errors.cvv && "CVV is required"} />
                            <TextField id="expire_date"  variant="outlined" margin="normal" fullWidth type='date' name='expire_date' value={expire_date} onChange={handleInputChange} error={errors.expire_date} helperText={errors.expire_date && "Expiration date is required"} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                {/* <Button variant="contained" color="primary" >
                                    Confirm Details
                                </Button> */}
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
