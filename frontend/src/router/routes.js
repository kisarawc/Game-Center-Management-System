import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import Feedback from '../pages/feedback/feedback';
import Event from '../pages/events/Event';
import FeedbackTable from '../pages/feedback/feedbackTable';
import Feedbacks from '../pages/feedback/feedbacks';

const MyRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/Events' element={<Event />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/feedbackTable' element={<FeedbackTable />} />
            <Route path='/feedbacks' element={<Feedbacks />} />
        </Routes>
    );
}

export default MyRouter;
