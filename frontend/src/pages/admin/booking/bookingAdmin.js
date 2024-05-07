import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PDFHeader from '../../../Components/common/Header/PDFHeader';
import PDFFooter from '../../../Components/common/Footer/PDFFooter';
import AdminHeader from '../../../Components/common/adminHeader'
const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings');
        setBookings(response.data.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const formatTime = (time) => {
    const localTime = new Date(time);
    return localTime.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.game_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MyDocument = ({ bookings }) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 2,
      },
      headerCell: {
        backgroundColor: '#ffffff',
        border: '1px solid black',
        padding: 5,
        textAlign: 'center',
        fontSize: 9,
      },
      tableRow: {
        flexDirection: 'row',

      },
      tableCell: {
        border: '1px solid black',
        padding: 5,
        textAlign: 'center',
        fontSize: 9,
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>

          <View style={styles.section}>
          <PDFHeader />
            <Text style={{ marginBottom: 10 }}>Current Booking Details</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={[styles.headerCell, { width: '10%' }]}>Date</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Start Time</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>End Time</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Duration (minutes)</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Request</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Fee</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Game Name</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Status</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Number of Players</Text>
            </View>

            <View>
              {bookings.map((booking) => (
                <View key={booking._id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{new Date(booking.date).toLocaleDateString()}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{formatTime(booking.start_time)}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{formatTime(booking.end_time)}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{booking.duration}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{booking.message_request}</Text>
                  <Text style={[styles.tableCell, { width:'15%' }]}>Rs.{booking.fee}.00</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{booking.game_name}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{booking.status}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{booking.num_players}</Text>
                </View>
              ))}
            </View>
            <PDFFooter />
          </View>
        </Page>
      </Document>
    );
  };
  

  return (
    <div>
    <AdminHeader />
    <div
      style={{
        //backgroundImage: "url('https://coreui.io/images/ogimages/coreui_1200_600.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ margin: '10px', padding: '10px', boxShadow: '0px 0px 10px rgba(7, 6, 6, 0.5)', borderRadius: '8px', width: '90%' }}>
        <h1 style={{ textAlign: 'center', marginTop: '25px', color: '#7157d8' }}>Current Booking Details</h1>
        <div style={{ display: 'flex',alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter Game Name To Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '20%', padding: '8px', boxSizing: 'border-box',marginLeft:'40px' }}
          />
          <PDFDownloadLink document={<MyDocument bookings={filteredBookings} />} fileName="booking_details.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Generating PDF...' : <button style={{ padding: '10px', backgroundColor: '#bc80f4', color: '#fff', border: 'none', borderRadius: '4px', marginLeft:'40px'}}>Generate PDF</button>
            }
          </PDFDownloadLink>
          <div style={{ backgroundColor: '#b184ec9c', width: '20%', color: '#4247d5', marginLeft: '500px', borderRadius: '10px', textAlign: 'center' }}>
            <h3 style={{ margin: '0', padding: '10px' ,color:'#ffffff'}}>Total Bookings: {bookings.length}</h3>
          </div>
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#ebebef', borderRadius: '8px' , color:'#1b0cbc'}}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Start Time</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>End Time</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Duration (minutes)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Message Request</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Fee</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Game Name</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Number of Players</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? '#f4f3f3' : '#ffffff' }}>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{new Date(booking.date).toLocaleDateString()}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{formatTime(booking.start_time)}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{formatTime(booking.end_time)}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{booking.duration}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{booking.message_request}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Rs.{booking.fee}.00</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{booking.game_name}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{booking.status}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{booking.num_players}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
      </div>
    </div>
  </div>
  );  
};

export default BookingAdmin;
