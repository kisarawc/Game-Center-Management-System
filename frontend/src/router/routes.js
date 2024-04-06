import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import game from '../pages/Game library/game';

import Event from '../pages/events/Event';

const MyRouter = () => {
    return (

           <Routes>
                <Route exact path='/' Component={HomePage}></Route>
                <Route path='/book' Component={Book}></Route>
                <Route path='/games' Component={game}></Route>
            
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<Event/>} />
            
        </Routes>

    );
}

export default MyRouter;
