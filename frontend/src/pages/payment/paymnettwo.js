import React, { useState } from 'react'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, FormControl, Typography, Button, TextField, InputLabel } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';

const Paymenttwo = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGenerateReport = async () => {
    // Fetch data from the server
    try {
      const response = await axios.post('http://localhost:3000/api/payments/getdatabasedonData', {
        startDate,
        endDate
      });
  
      if (response.status === 200) {
        const payments = response.data;
        console.log(payments); // Log the retrieved payments

        // Set state to indicate report is generated
        setIsReportGenerated(true);
        // Set report data
        setReportData(payments);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDownloadReport = () => {
    if (reportData) {
      console.log(reportData); // Log the
      // Generate PDF report
      generatePDFReport(reportData);
      // Clear date fields and reset UI
      setStartDate("");
      setEndDate("");
      setIsReportGenerated(false);
    } else {
      console.error('Report data is not available');
    }
  };

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const generatePDFReport = (data) => {
    const doc = new jsPDF();
    let y = 20; // Initial y position
  
    doc.text(20, y, 'Payment Report:');
    y += 10; // Increment y position for next content
  
    // Iterate over reportData and add each payment entry to the PDF
    data.forEach((payment, index) => {
      y += 10; // Increment y position for each payment entry
      doc.text(20, y, `Payment ${index + 1}:`);
      y += 5; // Increment y position
      doc.text(30, y, `Amount: ${payment.amount}`);
      y += 5;
      doc.text(30, y, `Date: ${formatDate(payment.date)}`);
      y += 5;
      doc.text(30, y, `Payment Method: ${payment.payment_method}`);
      y += 10; // Adjust vertical space between entries
    });
  
    doc.save('payment_report.pdf');
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
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
        <Box sx={{ marginTop: 6, marginLeft: 10 }}>
          <Typography variant="h3" color={'white'}>
            Select Here To Create Report!
          </Typography>
        </Box>
        <br />
        <Box sx={{ position: 'absolute', top: '200px' ,marginLeft:10, marginTop:'5', backgroundImage:'src\images\payment\pic2.jpg'}}>
          <Box style={{ gap: "50px" }}>
            <FormControl sx={{ margin: '1rem 0' }}>
              <TextField
                id="from-input"
                value={startDate}
                variant="outlined"
                type='date'
                onChange={handleStartDateChange}
              />
            </FormControl>
            <FormControl sx={{ margin: '1rem 0' }}>
              <TextField
                id="to-input"
                value={endDate}
                variant="outlined"
                type='date'
                onChange={handleEndDateChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap:"20px", marginTop: "1rem" }}>
            {isReportGenerated ? (
              <Typography variant="body1" color="secondary">
                Report Generated Successfully!
              </Typography>
            ) : (
              <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
                Create Report
              </Button>
            )}
            <Button variant="contained" color="primary" onClick={handleDownloadReport}>
              Download Report
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Paymenttwo;
