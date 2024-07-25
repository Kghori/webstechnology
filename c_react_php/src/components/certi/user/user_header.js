import React from 'react';
import { Link } from 'react-router-dom';
import { inuserId, inusername } from './user_session';


function User_header(){
    console.log(inusername);
    return(
        <>
        <h1>user header pdf</h1>
    
            <h1>header</h1>
            <nav className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-links">
            <label htmlFor="">{inuserId}</label>
                    <label htmlFor="">{inusername}</label>
                    {inuserId ? (
                        <>
            <li> <Link to="/userviewpdf" className="nav-item nav-link active">Home</Link></li>
            <li> <Link to="/user_logout" className="nav-item nav-link active">logout</Link></li>
</>):(<>
                <li> <Link to="/user_login" className="nav-item nav-link active">login</Link></li>
                 <li> <Link to="/user_signup" className="nav-item nav-link active">signup</Link></li>
                
                </>)}
       </ul></nav>
       
        </>
    )
}
export default User_header