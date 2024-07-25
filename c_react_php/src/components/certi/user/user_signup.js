import User_header from "./user_header";
import axios from "axios";
import React, {useState }from "react";
import { useNavigate } from "react-router-dom";

function User_signup(){
    const [formvalue,setformvalue]=useState({username:'', email:'', password:'', role:''});
    const [msg,setmsg]=useState('');
    const usenavigate=useNavigate();
    const handleinput =(e)=>{
        setformvalue({...formvalue, [e.target.name]:e.target.value});
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = {
            username: formvalue.username,
            email: formvalue.email,
            password: formvalue.password,
            role: formvalue.role
        };
    
        
            const result = await axios.post("http://localhost/react_cured_api/api/singnup.php", formdata);
            console.log(result.data); // Log the entire response data for debugging purposes
    
            if (result.data) {
                console.log(result.data.suc);
                usenavigate('/user_');
                setmsg(result.data);
                setTimeout(() => {
                    setmsg(""); // Clear the success message after a delay
                }, 4000);
            } else {
                console.log("No success message received");
            }  
    };
    
return(<><h1>signup
    
    </h1>
    
    
    
    
    <React.Fragment>
            <User_header/>
        <div className="container">
       
            <form  className="form_com"  onSubmit={handlesubmit}>
            <h2>Signup Form</h2>
            <p className="text-sucess"> { msg }</p>     
                <input type="text" id="username" value={formvalue.username} name="username" onChange={ handleinput} placeholder="username" />
                <br />
                <input type="email" id="email" name="email" value={formvalue.email} onChange={ handleinput}  placeholder="email" />
                <br />
                <input type="password" id="password" name="password" value={formvalue.password} onChange={ handleinput}placeholder="password"  />
                <br />
                <label htmlFor="" name="role" value={formvalue.role = "user"} onChange={handleinput}></label>
                <button name = "submit" type="submit">Sign Up</button>
            </form>
        </div>
      
        </React.Fragment>
 </>);
}
export default User_signup