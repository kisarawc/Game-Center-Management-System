import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Payment from '../pages/payment/payment';
import PaymentOne from '../pages/payment/paymnetone';
import PaymentTwo from '../pages/payment/paymnettwo';
import PaymentThree from '../pages/payment/paymentthree';

import Event from '../pages/events/Event';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />

            <Route path='/payment' element={<Payment />} />
            <Route path='/paymentone' element={<PaymentOne />} />
            <Route path='/paymenttwo' element={<PaymentTwo />} />
            <Route path='/paymentthree' element={<PaymentThree />} />

            
            

            <Route path='/Events' element={<Event/>} />

            
        </Routes>
    );
}

export default MyRouter;
