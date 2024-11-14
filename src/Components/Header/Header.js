// src/components/Header/Header.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="logo">
                    <NavLink to="/" className="logo-link">
                        Movie Explorer
                    </NavLink>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeClassName="active-link">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName="active-link">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
