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
        const response = await axios.get('http://localhost:5000/api/bookings');
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
              <Text style={[styles.headerCell, { width: '15%' }]}>Date</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Start Time</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>End Time</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Duration (minutes)</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Request</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Game Name</Text>
              <Text style={[styles.headerCell, { width: '15%' }]}>Status</Text>
              <Text style={[styles.headerCell, { width: '10%' }]}>Number of Players</Text>
            </View>

            <View>
              {bookings.map((booking) => (
                <View key={booking._id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{new Date(booking.date).toLocaleDateString()}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{formatTime(booking.start_time)}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{formatTime(booking.end_time)}</Text>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{booking.duration}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{booking.message_request}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{booking.game_name}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{booking.status}</Text>
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
    <div style={{ margin: '20px auto', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginTop: '25px' }}>Current Booking Details</h2>
      <input
        type="text"
        placeholder="Search Game Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', width: '40%', padding: '8px', boxSizing: 'border-box'  }}
      />
      <PDFDownloadLink document={<MyDocument bookings={filteredBookings} />} fileName="booking_details.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : <button style={{ margin: '20px 80px',padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Generate PDF</button>
        }
      </PDFDownloadLink>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Start Time</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>End Time</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Duration (minutes)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Message Request</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>User ID</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Game Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Number of Players</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{new Date(booking.date).toLocaleDateString()}</td>
              <td style={{ padding: '12px' }}>{formatTime(booking.start_time)}</td>
              <td style={{ padding: '12px' }}>{formatTime(booking.end_time)}</td>
              <td style={{ padding: '12px' }}>{booking.duration}</td>
              <td style={{ padding: '12px' }}>{booking.message_request}</td>
              <td style={{ padding: '12px' }}>{booking.user_id}</td>
              <td style={{ padding: '12px' }}>{booking.game_name}</td>
              <td style={{ padding: '12px' }}>{booking.status}</td>
              <td style={{ padding: '12px' }}>{booking.num_players}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BookingAdmin;
