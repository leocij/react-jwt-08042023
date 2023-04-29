import React from 'react';

// https://reactrouter.com/en/v6.3.0/getting-started/overview
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //yarn add react-router-dom
import Navbar from './config/navbar/Navbar';
import Home from './pages/Home';
import UserList from './pages/users/UserList';

export default function Pages() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/user-list" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    )
}