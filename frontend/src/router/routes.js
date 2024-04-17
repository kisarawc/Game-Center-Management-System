import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import AdminEvent from '../pages/admin/event/AdminEvent';
import Admin from '../pages/admin/home/admin';
import UserEvent from '../pages/events/UserEvent'
//import Event from '../pages/events/Event';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<UserEvent/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            <Route path='/admin' element={<Admin/>}/>
        </Routes>
    );
}

export default MyRouter;
