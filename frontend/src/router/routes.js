import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';

import Game from '../pages/Game library/game';

import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import Admin from '../pages/admin/home/admin';
import EditBooking from '../pages/Bookings/editBooking'; 

import AdminEvent from '../pages/admin/event/AdminEvent';

import UserEvent from '../pages/events/UserEvent'
import Login from '../pages/login/login';
import SignUp from '../pages/UserProfile/signup';
import ProfilePage from '../pages/UserProfile/profile'; 
import UsersTable from '../pages/UserProfile/usersTable'; 
import Event from '../pages/events/Event';
import PasswordReset from '../pages/UserProfile/passwordReset';
// import Event from '../pages/events/Event';
import Dashboard from '../pages/admin/home/admin';
import ForgotPassword from '../pages/UserProfile/forgetPsswrd';
import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import GameDetailPage from '../pages/Game library/gamedetails';
import GameTable from '../pages/Game library/gametable';
import CreateGameForm from '../pages/Game library/addgame';

import UPDashboard from '../pages/UserProfile/adminDashboard';

import Dashboard from '../pages/admin/home/admin';



const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<UserEvent/>} />
            {/* <Route path='/adminEvents' element={<AdminEvent/>} /> */}
            <Route path='/Event' element={<Event/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/login' Component={Login}></Route>
            <Route path='/signup' Component={SignUp}></Route>
            <Route path='/profile' Component={ProfilePage}></Route>
            <Route path='/usersTable' Component={UsersTable}></Route>
            <Route path='/admin' Component={Dashboard}></Route>
            <Route path='/forgetPsswrd' Component={ForgotPassword}></Route>
            <Route path='/passwordReset/:userId/:token' Component={PasswordReset}></Route>
            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
        


<Route path='/games' element={<Game />} />
            <Route path='/events' element={<Event />} />
            <Route path='/gamedetails/:gameId' element={<GameDetailPage />} />
            <Route path='/addgame' element={<CreateGameForm />} />
            <Route path='/gametable' element={<GameTable />} />
            
            {/* <Route path='/game' element={<Game/>} /> */}

            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
            
            <Route path='/bookings/edit/:id' element={<EditBooking />} /> 
            <Route path='/userEvents' element={<UserEvent/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            
   
            
            
            
            
            
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

                <Route path='/useradmin' Component={UPDashboard}></Route>
                
            )
            </Routes>

        


    );
}

export default MyRouter;
