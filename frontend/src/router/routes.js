import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import AdminEvent from '../pages/admin/event/AdminEvent';
import Admin from '../pages/admin/home/admin';
import UserEvent from '../pages/events/UserEvent'


const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<UserEvent/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            <Route path='/admin' element={<Admin/>}/>
        </Routes>

import Login from '../pages/login/login';
import SignUp from '../pages/UserProfile/signup';
import ProfilePage from '../pages/UserProfile/profile'; 
import UsersTable from '../pages/UserProfile/usersTable'; 
import Event from '../pages/events/Event';
import Dashboard from '../pages/UserProfile/adminDashboard';

const MyRouter = () => {
    return (

           <Routes>
                <Route exact path='/' Component={HomePage}></Route>
                <Route path='/book' Component={Book}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/signup' Component={SignUp}></Route>
                <Route path='/profile' Component={ProfilePage}></Route>
                <Route path='/Event' Component={Event}></Route>
                <Route path='/usersTable' Component={UsersTable}></Route>
                <Route path='/adminDashboard' Component={Dashboard}></Route>
            </Routes>

        


    );
}

export default MyRouter;
