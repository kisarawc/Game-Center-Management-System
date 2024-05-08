 import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Container, CssBaseline, Grid, Box } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom'; // Import NavLink instead of useHistory
import axios from 'axios';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { toast } from 'react-toastify';
import profileBackground from '../../images/login/profile.jpg';

const PasswordReset = () => {
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const userValid = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/passwordReset/${userId}/${token}`);

            const data = response.data;

            if (data.status === 201) {
                console.log("user valid");
            } else {
                window.location.href = "*";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const setval = (e) => {
        setPassword(e.target.value);
    };

    const sendPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/users/${userId}/${token}`, password);

            const data = response.data;

            if (data.status === 201) {
                setPassword("");
                setMessage(true);
                // Redirect to login page after successfully updating password
                window.location.href = "/login";
            } else {
                toast.error("!Token Expired, generate new link");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        userValid();
    }, []);

    return (
        <Box style={{ backgroundImage: `url(${profileBackground})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <Header />
            <div style={{ height: '59vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <Typography component="h1" variant="h5" style={{ fontFamily: 'Arial', fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
                            Enter your NEW Password
                        </Typography>
                        <form style={{ width: '100%' }} onSubmit={sendPassword}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="New Password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                value={password}
                                onChange={setval}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, color: 'white', backgroundColor: '#05cff7' }}
                            >
                                Reset
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/login" variant="body2" style={{ color: '#05cff7', textDecoration: 'none' }}>
                                    Remembered your password? Log In
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
            <Footer />
        </Box>
    );
};

export default PasswordReset;