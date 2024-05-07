import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Grid, Container, Snackbar, Dialog, DialogTitle, Box, DialogContent, DialogActions, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminHeader from '../../../Components/common/adminHeader';
import logo from '../../../images/header/logo.jpeg';

const AdminEvent = () => {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', imagePath: '' });
  const [events, setEvents] = useState([]);
  const [editEventIds, setEditEventIds] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState('');
  const [previewImages, setPreviewImages] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updatingEventId, setUpdatingEventId] = useState('');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const eventsResponse = await axios.get('http://localhost:5000/api/events');
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Fetch events when component mounts

  const createEvent = async () => {
    try {
      // Get the current date
      const currentDate = new Date().toISOString().slice(0, 10);
      // Set the date field of the new event to the current date
      const eventWithDate = { ...newEvent, date: currentDate };

      const eventResponse = await axios.post('http://localhost:5000/api/events', eventWithDate);
      console.log('New event created:', eventResponse.data);
      // After creating a new event, refetch the events to update the list
      fetchEvents();
      // Clear the input fields
      setNewEvent({ title: '', description: '', date: '', imagePath: '' });
      // Show the Snackbar
      setSnackbarMessage('Your Event Is Successfully Created');
      setSnackbarOpen(true);
      setPreviewImages({});
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Function to generate PDF report
  const generatePDFReport = () => {
    const selectedMonthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === months.indexOf(selectedMonth);
    });
  
    if (selectedMonthEvents.length === 0) {
      // No events found for the selected month
      setSnackbarMessage('No events found for the selected month.');
      setSnackbarOpen(true);
      return;
    }
  
    const doc = new jsPDF();
  
    // Function to add the header
    const addHeaderToPdf = (doc) => {
      // Load the logo image
      const logoImage = logo; // Update path to your logo image
      const imgWidth = 20;
      const imgHeight = 20;
  
      // Add the title and date
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F'); // Draw black background
      doc.addImage(logoImage, 'JPEG', 10, 5, imgWidth, imgHeight);
      doc.text('GG LOUNGE GAME CENTER', 50, 18); // Positioning the title
      doc.setFontSize(10); // Font size for the date
      doc.text(`Report generated: ${new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })}`, 150, 25); // Positioning the date
    };
  
    // Function to add the footer
    const addFooterToPdf = (doc) => {
      const footerText = 'GG LOUNGE\n165/A, New Kandy Rd, Welivita Junction, Malabe';
      doc.setFontSize(10);
      doc.setTextColor('#555');
      doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    };
  
    // Add the header to the PDF
    addHeaderToPdf(doc);
  
    // Add the footer to the PDF
    addFooterToPdf(doc);
  
    // Define the data for the autoTable
    const tableData = selectedMonthEvents.map(event => [
      event.title,
      new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
      // Add more event details if needed
    ]);
  
    // Draw the autoTable
    doc.autoTable({
      head: [['Event Title', 'Event Date']],
      body: tableData,
      startY: 40 // Starting Y position for the autoTable
    });
  
    // Save the PDF
    doc.save(`${selectedMonth}_report.pdf`);
  };
  
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      // Filter out the deleted event from the events state
      setEvents(events.filter(event => event._id !== eventId));
      // Close the delete confirmation dialog
      setDeleteDialogOpen(false);
      // Show the Snackbar
      setSnackbarMessage('Your Event Is Successfully Deleted');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateConfirmation = (eventId) => {
    setUpdatingEventId(eventId);
    setUpdateDialogOpen(true);
  };
  
  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };
  

  const handleDeleteConfirmation = (eventId) => {
    setDeletingEventId(eventId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteEvent(deletingEventId);
  };

  const updateEvent = async (eventId) => {
    try {
      const updatedEvent = editEventIds[eventId];
      const response = await axios.put(`http://localhost:5000/api/events/${eventId}`, updatedEvent);
      console.log('Event updated:', response.data);
      // Refetch the events to update the list
      fetchEvents();
      // Clear the edit state for this event
      setEditEventIds({ ...editEventIds, [eventId]: null });
      // Show the Snackbar
      setSnackbarMessage('Your Event Is Successfully Updated');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleUpdateEvent = (eventId) => {
    updateEvent(eventId);
    handleCloseUpdateDialog();
  };
  

  const handleEditChange = (eventId, field, value) => {
    setEditEventIds({
      ...editEventIds,
      [eventId]: {
        ...editEventIds[eventId],
        [field]: value
      }
    });
  };

  const handleCancelEdit = (eventId) => {
    setEditEventIds({ ...editEventIds, [eventId]: null });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <AdminHeader />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>Create New Event</Typography>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Description"
              multiline
              rows={4}
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              value={newEvent.imagePath}
              onChange={e => setNewEvent({ ...newEvent, imagePath: e.target.value })}
              onInput={e => setPreviewImages({ ...previewImages, [newEvent._id || 'new']: e.target.value })}
            />
            {previewImages[newEvent._id || 'new'] && (
              <img src={previewImages[newEvent._id || 'new']} alt="Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
            )}
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={createEvent}>Create Event</Button>
          </Grid>
        </Grid>
        <TextField
          select
          label="Select Month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          variant="outlined"
          style={{ marginTop: '20px' ,marginRight: '20px',width: '150px'}}
        >
          {months.map(month => (
            <MenuItem key={month} value={month}>{month}</MenuItem>
          ))}
        </TextField>

        {/* Add button to generate PDF report */}
        <Button variant="contained" color="primary" onClick={generatePDFReport} style={{ marginTop: '20px' }}>Generate PDF Report</Button>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '20px',marginTop:'20px'}}>Events</Typography>
        <Grid container spacing={2}>
          {events.map(event => (
            <Grid item xs={12} key={event._id}>
              <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', position: 'relative' }}>
                {editEventIds[event._id] ? (
                  <div>
                    <TextField
                      fullWidth
                      label="Event Title"
                      value={editEventIds[event._id].title}
                      onChange={e => handleEditChange(event._id, 'title', e.target.value)}
                      style={{ marginBottom: '10px' }}
                    />
                    <TextField
                      fullWidth
                      label="Event Description"
                      multiline
                      rows={4}
                      value={editEventIds[event._id].description}
                      onChange={e => handleEditChange(event._id, 'description', e.target.value)}
                      style={{ marginBottom: '10px' }}
                    />
                    <TextField
                      fullWidth
                      label="Image URL"
                      value={editEventIds[event._id].imagePath}
                      onChange={e => handleEditChange(event._id, 'imagePath', e.target.value)}
                      onInput={e => setPreviewImages({ ...previewImages, [event._id]: e.target.value })}
                      style={{ marginBottom: '10px' }}
                    />
                    {previewImages[event._id] && (
                      <img src={previewImages[event._id]} alt="Preview" style={{ maxWidth: '20%', height: '50%', marginTop: '10px', }} />
                    )}
                    <div style={{ position: 'absolute', bottom: '10px', left: '20px'}}>
                      <Button variant="contained" color="primary" onClick={() => handleUpdateConfirmation(event._id)} style={{ marginRight: '10px'}}>Update</Button>
                      <Button variant="contained" onClick={() => handleCancelEdit(event._id)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Typography variant="h6" style={{ marginBottom: '5px' }}>{event.title}</Typography>
                    <Typography style={{ marginBottom: '10px' }}>{event.description}</Typography>
                    <img
                      src={event.imagePath}
                      alt=""
                      style={{
                        width: '100%', 
                        height: '50%', 
                        maxHeight: '150px',
                        objectFit: 'cover', 
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: '10px', left: '20px' }}>
                      <Button variant="contained" color="secondary" onClick={() => handleDeleteConfirmation(event._id)} style={{ marginRight: '10px' }}>Delete</Button>
                      <Button variant="contained" onClick={() => setEditEventIds({ ...editEventIds, [event._id]: { ...event } })}>Edit</Button>
                    </div>
                  </div>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this event?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to update this event?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog} color="primary">
              No
            </Button>
            <Button onClick={() => handleUpdateEvent(updatingEventId)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminEvent;
