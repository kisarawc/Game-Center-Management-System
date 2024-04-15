import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import Admin from '../pages/admin/home/admin';
import EditBooking from '../pages/Bookings/editBooking'; 
import Event from '../pages/events/Event';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
           
            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
            <Route path='/admin' element={<Admin/>} /> 
            <Route path='/bookings/edit/:id' element={<EditBooking />} /> 
            
            <Route path='/Events' element={<Event/>} />

        </Routes>
    );
}

export default MyRouter;
