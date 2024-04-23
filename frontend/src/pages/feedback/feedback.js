import React, { useState } from 'react';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, Typography, TextField, Button, Rating, Paper, Grid, Snackbar } from "@mui/material";
import axios from 'axios';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async () => {
    if (date !== new Date().toISOString().split('T')[0]) {
      setError('Please select today\'s date');
      return;
    }

    const commentData = {
      comment,
      rating,
      date,
      userId,
      gameId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/feedbacks/createFeedback', commentData);
      console.log('Comment submitted:', response.data);

      if (response.status === 201) {
        setSubmissionMessage('Form was submitted successfully!');
        setOpenSnackbar(true);
      }

      setComment('');
      setRating(0);
      setDate('');
      setUserId('');
      setGameId('');
      setError('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDateChange = (value) => {
    if (value === new Date().toISOString().split('T')[0]) {
      setError('');
    }
    setDate(value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Header />
      <Box sx={{
        position: 'relative',
        backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkzNzg4MTIxMjM2NjQ1MzE1/aesthetic-website-backgrounds.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        {/* Search Bar */}
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>Search</Typography>
          <TextField
            variant="outlined"
            size="small"
            sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
        </Box>


        <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', padding: '20px', borderRadius: '10px', backgroundColor: '#ADD8E6' }}>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3, color: '#333' }}>Feedback Form</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="User ID"
                fullWidth
                value={userId}
                onChange={e => setUserId(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Game ID"
                fullWidth
                value={gameId}
                onChange={e => setGameId(e.target.value)}
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
                onChange={e => handleDateChange(e.target.value)}
                variant="outlined"
                error={error !== ''}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ backgroundColor: '#1976D2', color: '#ADD8E6', fontWeight: 'bold', '&:hover': { backgroundColor: '#1565C0' } }}
              >
                Submit
              </Button>
            </Grid>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Form submitted successfully!"
            />
          </Grid>
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
}

export default CommentForm;
