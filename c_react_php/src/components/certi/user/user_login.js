import User_header from "./user_header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function User_login(){
    const [userData, setUserData] = useState([]);
    const [formValue, setFormValue] = useState({ username: '', password: '', role:''});
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const reqData = await fetch("http://localhost/react_cured_api/api/singnup.php");
        const resData = await reqData.json();
        setUserData(resData.result);
    }

    const handleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formValue;
    
        const user = userData.find(user => user.username === username && user.password === password);
        const role = user ? user.role : null; // Get the role if user exists
    
        if (user && role) {
            sessionStorage.setItem('inuserId', user.id);
            sessionStorage.setItem('inusername', user.username);

            navigate("/userviewpdf");
            window.location.reload();
            console.log("Login successful");
            navigate("/userviewpdf");
            console.log("Login successful");
        } else {
            navigate("/user_login");
            console.log("Invalid credentials or missing role");
        }
    }
    

    return(<><h1>login
        </h1>
        <User_header />
            <div className="container">
                <form  className="form_com"  onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input type="text" id="username" onChange={handleInput} value={formValue.username} name="username" placeholder="Username" />
                    <br />
                    <input type="password" id="password" name="password" onChange={handleInput} value={formValue.password} placeholder="Password" />
                    <br />
                    <input type="hidden" onChange={handleInput} value={formValue.role="user"}/>
                    <button name="submit" type="submit">Log in</button>
                </form>
            </div>
        </>);
    }
    export default User_login