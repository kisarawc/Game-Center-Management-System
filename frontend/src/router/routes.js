import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/landingpage/homepage';
import Book from '../pages/Bookings/booking';
import AdminEvent from '../pages/admin/event/AdminEvent';
import Admin from '../pages/admin/home/admin';
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
        </Routes>

    )
}

export default MyRouter;
