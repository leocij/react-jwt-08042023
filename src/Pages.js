import React from 'react';

// https://reactrouter.com/en/v6.3.0/getting-started/overview
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //yarn add react-router-dom
import UserList from './pages/UserList';

export default function Pages() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/user-list" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    )
}