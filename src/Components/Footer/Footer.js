

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <p>&copy; 2024 Movie Explorer. All rights reserved.</p>
            <ul className="footer-links">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
