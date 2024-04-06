import React from 'react';
import { Route , Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Login from '../pages/login/login';
import SignUp from '../pages/UserProfile/signup';
import ProfilePage from '../pages/UserProfile/profile'; 


const MyRouter = () => {
    return (
           <Routes>
                <Route exact path='/' Component={HomePage}></Route>
                <Route path='/book' Component={Book}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/signup' Component={SignUp}></Route>
                <Route path='/profile' Component={ProfilePage}></Route>
            </Routes>
    );
}

export default MyRouter;
