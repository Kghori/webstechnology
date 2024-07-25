// Footer.js

import React from 'react';
import './style.css'; // Import CSS file for styling

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">Logo</div>
                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p>Contact us: contact@example.com</p>
            </div>
        </footer>
    );
}

export default Footer;
