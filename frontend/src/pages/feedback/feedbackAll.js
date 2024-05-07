import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';

const userId = sessionStorage.getItem('userId');

const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState('');

    useEffect(() => {
        async function fetchFeedbacks() {
            try {
                const response = await axios.get(`http://localhost:5000/api/feedbacks`);
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        }

        fetchFeedbacks();
    }, []);

    const handleEdit = (id) => {
        const selected = feedbacks.find(feedback => feedback._id === id);
        setSelectedFeedback(selected);
        setEditedComment(selected.comment);
        setEditedRating(selected.rating);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/feedbacks/deleteFeedback/${id}`);
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedFeedback(null);
        setEditedComment('');
        setEditedRating('');
    };

    const handleSaveChanges = async () => {
        try {
            const updatedFeedback = {
                ...selectedFeedback,
                comment: editedComment,
                rating: editedRating
            };

            await axios.put(`http://localhost:5000/api/feedbacks/updateFeedback/${selectedFeedback._id}`, updatedFeedback);

            setFeedbacks(feedbacks.map(feedback =>
                feedback._id === selectedFeedback._id ? updatedFeedback : feedback
            ));

            setOpenDialog(false);
            setSelectedFeedback(null);
            setEditedComment('');
            setEditedRating('');
        } catch (error) {
            console.error('Error updating feedback:', error);
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
                <Grid container spacing={2} justifyContent="center">
                    {feedbacks.map((feedback) => (
                        <Grid item key={feedback._id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/345x140/?game&${feedback._id}`}
                                    alt="Game Image"
                                />
                                <CardContent>

                                    <Typography variant="body2" color="text.secondary">
                                        Game Name: {feedback.game_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Comment: {feedback.comment}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Rating: {feedback.rating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date: {new Date(feedback.date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Feedback</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Comment"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Rating"
                        value={editedRating}
                        onChange={(e) => setEditedRating(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default FeedbackTable;
