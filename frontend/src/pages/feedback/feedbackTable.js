import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Button, Grid, Typography } from '@mui/material';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';


const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        async function fetchFeedbacks() {
            try {
                const response = await axios.get('http://localhost:5000/api/feedbacks');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        }

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/feedbacks/deleteFeedback/${id}`);
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
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
                <Grid container sx={{ marginBottom: '30px', display: 'block' }}>
                    <Typography component={'center'} sx={{ fontSize: '25px', textAlign: 'center' }} >Feedback Form(Admin view)</Typography>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Comment</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbacks.map((feedback) => (
                                    <TableRow key={feedback._id}>
                                        <TableCell>{feedback.comment}</TableCell>
                                        <TableCell>{feedback.rating}</TableCell>
                                        <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDelete(feedback._id)} variant="contained" color="secondary">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
};

export default FeedbackTable;
