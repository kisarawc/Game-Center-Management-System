import React from 'react';
import { Route , Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Login from '../pages/login/login';

const MyRouter = () => {
    return (
           <Routes>
                <Route exact path='/' Component={HomePage}></Route>
                <Route path='/book' Component={Book}></Route>
                <Route path='/login' Component={Login}></Route>
            </Routes>
    );
}

export default MyRouter;
