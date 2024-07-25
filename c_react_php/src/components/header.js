import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { userId, username } from './session';

function Header() {
    console.log(userId);
    return (
        <>
            <h1>header</h1>
            <nav className="navbar">
                <div className="logo">Logo</div>
                <ul className="nav-links">
                    <li><Link to="/home" className="nav-item nav-link active">Home</Link></li>
                    <label htmlFor="">{userId}</label>
                    <label htmlFor="">{username}</label>

                    {userId ? (
                        <>
                            <li><Link to="/view_certi" className="nav-item nav-link active">View Certificate</Link></li>
                            <li><Link to="/carti_form" className="nav-item nav-link active">Certificate Details</Link></li>
                            <li><Link to="/categories" className="nav-item nav-link active">Categories</Link></li>
                            <li><Link to="/view_categories" className="nav-item nav-link active">View Categories</Link></li>
                            <li><Link to="/logout" className="nav-item nav-link active">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="nav-item nav-link active">Login</Link></li>
                            <li><Link to="/signup" className="nav-item nav-link active">Signup</Link></li>
                        </>
                    )}

                </ul>
            </nav>
        </>
    );
}

export default Header;
