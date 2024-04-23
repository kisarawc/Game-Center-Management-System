import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Rating, Paper, Grid } from "@mui/material";
import axios from 'axios';

const FeedbackForm = ({ onSubmit, defaultUserId, defaultGameId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState('');
    const [user_id, setUser_id] = useState(defaultUserId || '');
    const [game_id, setGame_id] = useState(defaultGameId || '');
    const [picture, setPicture] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async () => {
        const feedbackData = {
            comment,
            rating,
            date,
            user_id,
            game_id,
            picture
        };

        try {
            const response = await axios.post('http://localhost:5000/api/feedbacks/createFeedback', feedbackData);
            console.log('Feedback submitted:', response.data);

            if (response.status)
                onSubmit(feedbackData);

            setComment('');
            setRating(0);
            setPicture('');
            setDate('');
            setUser_id(defaultUserId || '');
            setGame_id(defaultGameId || '');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', padding: '20px', borderRadius: '10px', backgroundColor: '#ff0000' }}>
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3, color: '#333' }}>Feedback Form</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="User ID"
                        fullWidth
                        value={user_id}
                        onChange={e => setUser_id(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Game ID"
                        fullWidth
                        value={game_id}
                        onChange={e => setGame_id(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Comment"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ marginBottom: 1, color: '#333' }}>Rating:</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        precision={0.5}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="date"
                        label="Date"
                        fullWidth
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setPicture(e.target.files[0])}
                        style={{ display: 'none' }}
                        id="picture-input"
                    />
                    <label htmlFor="picture-input">
                        <Button variant="outlined" component="span" sx={{ color: '#333', borderColor: '#333', marginBottom: 2 }}>Upload Picture</Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ backgroundColor: '#ff9800', color: '#ff0000', fontWeight: 'bold', '&:hover': { backgroundColor: '#f57c00' } }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default FeedbackForm;