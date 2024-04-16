import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
//import AdminEvent from '../pages/events/AdminEvent';
import UserEvent from '../pages/events/UserEvent';
//import Event from '../pages/events/Event';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<UserEvent/>} />
            
        </Routes>
    );
}

export default MyRouter;
