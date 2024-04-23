import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';


const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState('');

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

    const handleEdit = (id) => {
        // Find the selected feedback by ID
        const selected = feedbacks.find(feedback => feedback._id === id);
        setSelectedFeedback(selected);
        // Set the initial values for editing
        setEditedComment(selected.comment);
        setEditedRating(selected.rating);
        // Open the dialog
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
        // Close the dialog
        setOpenDialog(false);
        // Clear selected feedback
        setSelectedFeedback(null);
        // Clear edited data
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

            // Update feedbacks state with the updated feedback
            setFeedbacks(feedbacks.map(feedback =>
                feedback._id === selectedFeedback._id ? updatedFeedback : feedback
            ));

            // Close the dialog
            setOpenDialog(false);
            // Clear selected feedback
            setSelectedFeedback(null);
            // Clear edited data
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
                <Grid container sx={{ marginBottom: '30px', display: 'block' }}>
                    <Typography component={'center'} sx={{ fontSize: '25px', textAlign: 'center' }} >Feedbacks</Typography>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Comment</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell> {/* Add a column for actions */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbacks.map((feedback) => (
                                    <TableRow key={feedback._id}>
                                        <TableCell>{feedback.comment}</TableCell>
                                        <TableCell>{feedback.rating}</TableCell>
                                        <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(feedback._id)} variant="contained" color="primary">Edit</Button>
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

            {/* Dialog for editing feedback */}
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
                    {/* Add input fields to edit other feedback data */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FeedbackTable;
