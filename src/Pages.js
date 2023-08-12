import React from "react";

// https://reactrouter.com/en/v6.3.0/getting-started/overview
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //yarn add react-router-dom
import Navbar from './config/navbar/Navbar';
import ClinicList from "./pages/clinics/ClinicList";
import CredentialForm from "./pages/credentials/CredentialForm";
import Home from './pages/Home';
import UserForm from './pages/users/UserForm';
import UserList from './pages/users/UserList';
import UserShow from './pages/users/UserShow';

export default function Pages() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/user-list" element={<UserList />} />
                <Route exact path="/user-form" element={<UserForm />} />
                <Route exact path="/user-show" element={<UserShow />} />
                <Route exact path="/credential-form" element={<CredentialForm />} />
                <Route exact path="/clinic-list" element={<ClinicList />} />
            </Routes>
        </BrowserRouter>
    )
}