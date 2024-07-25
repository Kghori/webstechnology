import React, { useState, useEffect } from 'react';
import Headers from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

function Login() {
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
        const { id,username, password } = formValue;
    
        const user = userData.find(user => user.username === username && user.password === password);
        const role = user ? user.role : null; // Get the role if user exists
    
        if (user && role) {
            sessionStorage.setItem('userId', user.id);
            sessionStorage.setItem('username', user.username);

            navigate("/home");
            window.location.reload();
            console.log("Login successful");
            navigate("/home");
            console.log("Login successful");
        } else {
            navigate("/login");
            console.log("Invalid credentials or missing role");
        }
    }
    

    return (
        <>
            <Headers />
            <div className="container">
                <form  className="form_com"  onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input type="text" id="username" onChange={handleInput} value={formValue.username} name="username" placeholder="Username" />
                    <br />
                    <input type="password" id="password" name="password" onChange={handleInput} value={formValue.password} placeholder="Password" />
                    <br />
                    <input type="hidden" onChange={handleInput} value={formValue.role="admin"}/>
                    <button name="submit" type="submit">Log in</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;






















// import React, { useState, useEffect } from 'react';
// import Headers from './header';
// import Footer from './footer';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [userData, setUserData]= useState([]);
//     useEffect( ()=>{   
//         getUserData();
//         },[]);
//         const getUserData= async()=>{
//             const reqData= await fetch("http://localhost/react_cured_api/api/singnup.php");
//             const resData= await reqData.json();  
//             console.log(resData.result);         
//             setUserData(resData.result);
//              } 
//                 const [formvalue,setformvalue]= useState({username:'',password:''});
//                 const navigate=useNavigate();

//              const handleinput=(e)=>{
//               setformvalue({...formvalue,[e.target.name]:e.target.value});
//              }
//              const handlesubmit = async (e) => {
//                 e.preventDefault();
//                 const formdata = {
//                     username: formvalue.username,
//                     email: formvalue.email,
//                     password: formvalue.password,
//                     role: formvalue.role
                   
//                 };
                
//                 {userData.length > 0 ? (
                        
//                     userData.map((udata) => {
//                        console.log(formvalue.role)
//                         const {  username, password, role} = udata;
//                         console.log(formvalue.role);
//                         // console.log("db:"+role)
//                         if (formvalue.username != username && formvalue.password != password  /* || formvalue.password===password */) {
//                             navigate("/");
//                             console.log("Login successfully"); // Log a success message if credentials match
//                         } else {
//                             navigate("/login"); // Navigate to the login page if credentials don't match
//                             console.log("Verify username and password"); // Log a message for verification
//                         }
                        
//                                // console.log(formdata.username);
// })) : (
//                     <tr>
//                         <td colSpan="3">No data available</td>
//                     </tr>
//                 )}
        
        

              
//                 // console.log()
//                 console.log(formdata.username);
//                 // if(formvalue.username===userData.username  && formvalue.password===userData.password && formvalue.role==userData.role){
//                 //     navigate('/carti_form');
//                 // }
//                 // else{
//                 //     alert("Invalid Credentials");
//                 // }
//              }
            
        
//              return (
//                 <>
                               
                

//                     <Headers />
//                     <div className="container">
//                         <form onSubmit={handlesubmit}>
//                             <h2>Login</h2>
//                             <input type="text" id="username" onChange={handleinput} value={formvalue.username} name="username" placeholder="Username" />
//                             <br />
//                             <input type="password" id="password" name="password" onChange={handleinput} value={formvalue.password} placeholder="Password" />
//                             <br />
//                             {/* <label htmlFor="role"    id="role" name="role" onChange={handleinput}  value={formvalue.role} >user </label> */}
//                             <input type="hidden" id="role" name="role" placeholder="Role" onChange={handleinput} value={formvalue.role="user"} />
//                             <button name="submit" type="submit">Log in</button>
            
//                             {/* Render user data table */}
                           
//                         </form>
//                     </div>
//                     <Footer />
//                 </>
// );
//         }
                

// export default Login;








    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const reqdata = await fetch(URL);
    //             if (!reqdata.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const resdata = await reqdata.json();
    //             console.log(resdata);
    //             setudata(resdata);
    //         } catch (error) {
    //             // console.error('Error fetching user data:', error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);

