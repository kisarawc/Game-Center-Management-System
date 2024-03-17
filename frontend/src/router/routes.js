import React from 'react';
import { Route , Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';

const MyRouter = () => {
    return (
           <Routes>
                <Route exact path='/' Component={HomePage}></Route>
                <Route path='/book' Component={Book}></Route>
            </Routes>
    );
}

export default MyRouter;
