import React, { useState, useEffect } from "react";
import Footer from './footer';
import axios from "axios";
import Headers from './header';
import { userId } from './session';


function Categories() {
    const [formvalue, setformvalue] = useState({ admincate: '', active: '', adminid: userId });
    const handleInput = (e) => {
        setformvalue({ ...formvalue, [e.target.name]: e.target.value });
    }
    const [msg,setmsg] = useState('');
    // const handlesubmit = async (e) => {
    //     e.preventDefault();
    //     const formdata = { admincate: formvalue.admincate, active: formvalue.active, adminid: formvalue.adminid };
    //     const req = await axios.post("http://localhost/react_cured_api/api/cate.php", formdata);
    //     console.log(req);
    // }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = { admincate: formvalue.admincate, active: formvalue.active, adminid: formvalue.adminid };
        const req = await axios.post("http://localhost/react_cured_api/api/cate.php", formdata);
            console.log(req.data.suc);
            setmsg(req.data.suc);
    }
    return (
        <>
            <Headers />
            <div>
                <form  className="form_com" onSubmit={handlesubmit}>
                <h5 style={{color:'green'}}>{msg}</h5>
                    <h2>Add Category</h2>
                  
                    <div className="form-group">
                      
                        <input type="text" id="admincate" onChange={handleInput} name="admincate" placeholder='add categories' required />
                    </div>
                    <div style={{ display: 'flex', fontSize: '20px', width: '50%', justifyContent: 'space-around', margin: '5%' }}>
                        <div>
                            <input type="radio" id="yes" value="Yes" name="active" checked={formvalue.active === "Yes"} onChange={handleInput} /> Yes
                        </div>
                        <div>
                            <input type="radio" id="yes" value="No" name="active" checked={formvalue.active === "No"} onChange={handleInput} /> No
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adminid">Admin ID:</label>
                        <input type="hidden" id="adminid" name="adminid" value={formvalue.adminid} readOnly />
                    </div>
                    <div className="form-group">
                        <button type="submit">Add Categories</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Categories;
