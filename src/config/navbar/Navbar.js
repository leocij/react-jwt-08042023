import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (isOpen) {
            setIsOpen(!isOpen);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar01"
                aria-controls="navbars01"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-white">Menu</span>
            </button>
            <div className={`${isOpen ? 'show' : ''} collapse navbar-collapse`} id="navbar01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" onClick={handleToggle}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-list" className="nav-link" onClick={handleToggle}>Users</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}