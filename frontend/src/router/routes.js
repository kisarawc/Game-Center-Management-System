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
import Dashboard from '../pages/admin/home/admin';


const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />


            <Route path='/payment' element={<Payment />} />
            <Route path='/paymentone/:userid/:bookid' element={<PaymentOne />} />
            <Route path='/paymenttwo' element={<PaymentTwo />} />
            <Route path='/paymentthree' element={<PaymentThree />} />
            <Route path='/paymentfour' element={<PaymentFour />} />
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
                <Route path='/admin' Component={Dashboard}></Route>

            <Route path='/Events' element={<UserEvent/>} />
            <Route path='/adminEvents' element={<AdminEvent/>} />
            <Route path='/admin' element={<Admin/>}/>

        </Routes>

    )


    }

export default MyRouter;
