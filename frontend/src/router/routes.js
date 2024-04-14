import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Game from '../pages/Game library/game';
import AddGame from '../pages/Game library/addgame';
import GameTable from '../pages/Game library/gametable';
import GameDetailPage from '../pages/Game library/gamedetails';
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

        </Routes>
    );
}

export default MyRouter;
