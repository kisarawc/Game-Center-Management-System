import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';

import Payment from '../pages/payment/payment';
import PaymentOne from '../pages/payment/paymnetone';
import PaymentTwo from '../pages/payment/paymnettwo';
import PaymentThree from '../pages/payment/paymentthree';
import PaymentFour from '../pages/payment/paymentfour';


import BookingAdmin from '../pages/admin/booking/bookingAdmin';
import Admin from '../pages/admin/home/admin';
import EditBooking from '../pages/Bookings/editBooking'; 

import Paymentfive from '../pages/payment/paymnetfive';

import AdminEvent from '../pages/admin/event/AdminEvent';

import UserEvent from '../pages/events/UserEvent'

import Login from '../pages/login/login';
import SignUp from '../pages/UserProfile/signup';
import ProfilePage from '../pages/UserProfile/profile'; 
import UsersTable from '../pages/UserProfile/usersTable'; 
import Event from '../pages/events/Event';
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

            <Route path='/games' element={<Game />} />
            <Route path='/events' element={<Event />} />
            <Route path='/gamedetails/:gameId' element={<GameDetailPage />} />
            <Route path='/addgame' element={<CreateGameForm />} />
            <Route path='/gametable' element={<GameTable />} />
            <Route path='/Events' element={<Event/>} />
            {/* <Route path='/game' element={<Game/>} /> */}

            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
            
            <Route path='/bookings/edit/:id' element={<EditBooking />} /> 
            
            <Route path='/Events' element={<Event/>} />


        

            
            
            <Route path='/admin' element={<Admin/>}/>
   


            <Route path='/payment' element={<Payment />} />
           
            <Route path='/paymenttwo' element={<PaymentTwo />} />
            <Route path='/paymentthree' element={<PaymentThree />} />
            <Route path="/paymentone/:userid/:bookid/:fee" element={<PaymentOne />} />
            <Route path="/paymentfour/:userid/:bookid/:amount/:date/:payment_method" element={<PaymentFour />} />
            <Route path='/paymentfive' element={<Paymentfive />} />

            <Route path='/Events' element={<Event/>} />
 
            <Route path='/bookingAdmin' element={<BookingAdmin/>} /> 
            <Route path='/admin' element={<Admin/>} /> 
            <Route path='/bookings/edit/:id' element={<EditBooking />} /> 

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

            

            <Route path='/Events' element={<UserEvent/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            

        </Routes>

    )


    }

export default MyRouter;
