import React, { useState, useEffect } from 'react'; 
import Header from '../../Components/common/Header/header';
import Footer from '../../Components/common/Footer/footer';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button, TextField } from '@mui/material';

const Paymenttwo = () => {
  const years = [2023, 2024, 2025];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showText, setShowText] = useState(false);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleFromInputChange = (event) => {
    setFromValue(event.target.value);
  };

  const handleToInputChange = (event) => {
    setToValue(event.target.value);
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
            <span className={showText ? 'word-animation' : ''}>Select</span>&nbsp;
            <span className={showText ? 'word-animation' : ''}>Here</span>&nbsp;
            <span className={showText ? 'word-animation' : ''}>To</span>&nbsp;
            <span className={showText ? 'word-animation' : ''}>Create</span>&nbsp;
            <span className={showText ? 'word-animation' : ''}>Report!</span>
          </Typography>
        </Box>
        <br />
        <Box sx={{ position: 'absolute', top: '200px' ,marginLeft:10, marginTop:'5', backgroundImage:'src\images\payment\pic2.jpg'}}>
          
          <FormControl sx={{ margin: '1rem 0' }}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ margin: '1rem 0' }}>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              labelId="month-label"
              id="month"
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ margin: '1rem 0', width: 100 }}>
            <InputLabel id="from-label">From</InputLabel>
            <TextField
              id="from-input"
              label="From"
              value={fromValue}
              onChange={handleFromInputChange}
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ margin: '1rem 0', width: 100 }}>
            <InputLabel id="to-label">To</InputLabel>
            <TextField
              id="to-input"
              label="To"
              value={toValue}
              onChange={handleToInputChange}
              variant="outlined"
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Button variant="contained" color="primary">
              Download Report
            </Button>
            <Button variant="contained" color="secondary">
              Create Report
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Paymenttwo;
