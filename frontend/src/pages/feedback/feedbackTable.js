import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

    // Function to generate the PDF report
    const generatePDF = () => {
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 20,
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1,
            },
            tableCell: {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
            },
        });

        // Create the PDF document
        const pdfDocument = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Feedback Report</Text>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={styles.tableCell}>User ID</TableCell>
                                    <TableCell style={styles.tableCell}>Game Name</TableCell>
                                    <TableCell style={styles.tableCell}>Comment</TableCell>
                                    <TableCell style={styles.tableCell}>Rating</TableCell>
                                    <TableCell style={styles.tableCell}>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbacks.map((feedback) => (
                                    <TableRow key={feedback._id}>
                                        <TableCell style={styles.tableCell}>{feedback.user_id}</TableCell>
                                        <TableCell style={styles.tableCell}>{feedback.game_name}</TableCell>
                                        <TableCell style={styles.tableCell}>{feedback.comment}</TableCell>
                                        <TableCell style={styles.tableCell}>{feedback.rating}</TableCell>
                                        <TableCell style={styles.tableCell}>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </View>
                </Page>
            </Document>
        );

        return pdfDocument;
    };

    // Function to handle PDF download
    const handleDownloadPDF = () => {
        const pdfBlob = new Blob([generatePDF()], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Feedback_Report.pdf');
        document.body.appendChild(link);
        link.click();
    };

    return (
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
            <Header />
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', width: '80%', marginTop: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Feedback Form (Admin view)</Typography>
                <Button onClick={handleDownloadPDF} variant="contained" color="primary" sx={{ position: 'absolute', top: '160px', right: '200px', zIndex: 1 }}>Download Report</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Game Name</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbacks.map((feedback) => (
                            <TableRow key={feedback._id}>
                                <TableCell>{feedback.user_id}</TableCell>
                                <TableCell>{feedback.game_name}</TableCell>
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
            </Box>
            <Footer />
        </Box>
    );
};

export default FeedbackTable;
