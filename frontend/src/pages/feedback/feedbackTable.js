import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/header/logo.jpeg';

const FeedbackTable = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [pdfVisible, setPdfVisible] = useState(false); // State to control PDF visibility
    const [searchQuery, setSearchQuery] = useState('');

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


    const filteredfeedbacks = feedbacks.filter((feedback) =>
        feedback?.game_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/feedbacks/deleteFeedback/${id}`);
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };
    const genaratePDFReport = () => {
        // Function to generate the PDF report
        const doc = new jsPDF();

        // Function to add the header
        const addHeaderToPdf = (doc) => {
            // Load the logo image
            const logoImage = logo; // Replace 'path/to/your/logo' with the correct path to your logo image
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
        const tableData = filteredfeedbacks.map(feedback => [
            feedback.game_name,
            feedback.rating,
            feedback.comment,
            new Date(feedback.date).toLocaleDateString('en-US', { timeZone: 'UTC' })
        ]);

        // Draw the autoTable
        doc.autoTable({
            head: [['Game', 'Rating', 'Comment', 'Date']],
            body: tableData,
            startY: 40 // Starting Y position for the autoTable
        });

        // Save the PDF
        doc.save('feedback_report.pdf'); // Provide a valid filename for saving the PDF
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

            <Box
                sx={{
                    position: 'relative',
                    marginTop: '20px',
                    marginRight: '20px',
                }}
            >
                <input
                    type="text"
                    placeholder="Search Game Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '8px',
                        boxSizing: 'border-box',
                        width: '300px',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                />
            </Box>

            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '80%',
                    marginTop: '20px',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Feedback Form (Admin view)
                </Typography>
                <Button
                    onClick={genaratePDFReport}
                    variant="contained"
                    color="primary"
                    sx={{ position: 'absolute', top: '220px', right: '200px', zIndex: 1 }}
                >
                    Download Report
                </Button>

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
                        {filteredfeedbacks.map((feedback) => (
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

            {/* Place the Footer outside of the Box */}
            <Footer />
        </Box>
    );
};

export default FeedbackTable;
