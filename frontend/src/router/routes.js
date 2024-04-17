import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Login from '../pages/login/login';
import SignUp from '../pages/UserProfile/signup';
import ProfilePage from '../pages/UserProfile/profile'; 
import UsersTable from '../pages/UserProfile/usersTable'; 
import Event from '../pages/events/Event';
import Dashboard from '../pages/UserProfile/adminDashboard';
import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import Admin from '../pages/admin/home/admin';
import EditBooking from '../pages/Bookings/editBooking'; 

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
                <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
                <Route path='/admin' element={<Admin/>} /> 
                <Route path='/bookings/edit/:id' element={<EditBooking />} /> 
            </Routes>

        

    );
}

export default MyRouter;
