import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';

import Game from '../pages/Game library/game';

import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import Admin from '../pages/admin/home/admin';
import EditBooking from '../pages/Bookings/editBooking'; 

import Event from '../pages/events/Event';
import GameDetailPage from '../pages/Game library/gamedetails';
import GameTable from '../pages/Game library/gametable';
import CreateGameForm from '../pages/Game library/addgame';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />

            <Route path='/games' element={<Game />} />
            <Route path='/events' element={<Event />} />
            <Route path='/gamedetails/:gameId' element={<GameDetailPage />} />
            <Route path='/addgame' element={<CreateGameForm />} />
            <Route path='/gametable' element={<GameTable />} />
            <Route path='/Events' element={<Event/>} />
            {/* <Route path='/game' element={<Game/>} /> */}

            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
            <Route path='/admin' element={<Admin/>} /> 
            <Route path='/bookings/edit/:id' element={<EditBooking />} /> 
            
            <Route path='/Events' element={<Event/>} />


        </Routes>

    );
}

export default MyRouter;
