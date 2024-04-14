import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Game from '../pages/Game library/game';
import Event from '../pages/events/Event';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
          <Route path='/games' element={<Game />} />
            <Route path='/events' element={<Event />} />
            <Route path='/gamedetails/:gameId' element={<GameDetailPage />} />
            <Route path='/addgame' element={<AddGame />} />
            <Route path='/gametable' element={<GameTable />} />

            <Route path='/Events' element={<Event/>} />
            <Route path='/game' element={<Game/>} />
        </Routes>

    );
}

export default MyRouter;
