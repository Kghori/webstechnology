// // import React, { useState } from 'react';
// import Headers from './header';
// import Footer from './footer';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { userId } from './session';
// import { useParams } from 'react-router-dom';
// import React, { useState, useEffect } from "react";

// function CertificateForm() {
//     const { id } = useParams();
//     console.log(id);
//     const [formvalue, setFormValue] = useState({ Candidatename: '', Candidate_owner_name: '', Candidate_Filed: '', Candidate_choice: '', availability: '' ,adminid:userId});
//     const [msg, setMsg] = useState('');
//     const [userData, setUserData] = useState([]);
//     const navigate = useNavigate();
//     const handleInput = (e) => {
//         setFormValue({ ...formvalue, [e.target.name]: e.target.value });
//     }
//     const handlesubmit=async(e)=>{
//             e.preventDefault();
//             const formData= {Candidatename:formvalue.Candidatename, Candidate_owner_name:formvalue.Candidate_owner_name, Candidate_Filed:formvalue.Candidate_Filed,Candidate_choice:formvalue.Candidate_choice,availability:formvalue.availability,adminid:formvalue.adminid}; 
//                 const req= await axios.post("http://localhost/react_cured_api/api/certi_detail.php",formData);
//                 console.log(req);
//                 // let responnce=await req.json();
//                 // console.log(responnce);
//             }
//             useEffect(() => {
//                 getUserData();
               
//             }, []);
        
//             const getUserData = async () => {
//                        const req = await fetch(`http://localhost/react_cured_api/api/cate.php?adminid=${formvalue.adminid}`);
//                     const res = await req.json();
//                     if (res && res.cate) {
//                         // console.log("id", formvalue.adminid);
//                         console.log(res.cate);
//                         setUserData(res.cate); // Assuming the array of categories is stored in res.cate
//                     }
//              }
//             // const fetchdata=async()=>{
//             //     // console.log(userId);
//             //     const req = await fetch(`http://localhost/react_cured_api/api/cate.php?adminid=${formvalue.adminid}`);
//             // const res = await req.json();
//             //     if (res && res.cate) {
//             //         // console.log("id", formvalue.adminid);
//             //         console.log(res);
//             //         setUserData(res); // Assuming the array of categories is stored in res.cate
//             //     }
//             // }
//     return (
//         <>
//             <Headers />
//             <form   className="form_com"  onSubmit={handlesubmit}>
//                 <h2>Submit form</h2>
//                 <div>
//                     <input type="text" name="Candidatename" value={formvalue.Candidatename} placeholder="Candidate Holder Name" onChange={handleInput} />
//                 </div>
//                 <div>
//                     <input type="text" name="Candidate_owner_name" value={formvalue.Candidate_owner_name} placeholder="Candidate owner Name" onChange={handleInput} />
//                 </div>
//                 <div>
//                     <input type="text" name="Candidate_Filed" value={formvalue.Candidate_Filed} placeholder="Candidate Filed" onChange={handleInput} />
                   
//                 </div>
//                 <div>
//             <select  name="Candidate_choice" id="categories" Value={formvalue.Candidate_choice} onChange={handleInput}>
//     <option value="category1">Category 1</option>
//     <option value="category2">Category 2</option>
//   </select>
// </div>
//                 <div style={{ display: 'flex', fontSize: '20px', width: '50%', justifyContent: 'space-around', margin: '5%' }}>
//                     <div>
//                         <input type="radio" id="yes" value="Yes" name="availability" checked={formvalue.availability === "Yes"} onChange={handleInput} /> Yes
//                     </div>
//                     <div>
//                         <input type="radio" id="no" value="No" name="availability" checked={formvalue.availability === "No"} onChange={handleInput} /> No
//                     </div>
                    
//                 </div>
//                 <label htmlFor="adminid"></label>
//                         <input type="hidden" id="adminid" name="adminid" value={formvalue.adminid} readOnly />
//                 <button type="submit">Submit</button>
//             </form>
//         </>
//     );
// }

// export default CertificateForm;
import React, { useState, useEffect } from 'react'; // Importing useState and useEffect together
import Headers from './header';
import Footer from './footer';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Importing useParams directly from react-router-dom
import { userId } from './session';

function CertificateForm() {
    const { id } = useParams();
    console.log(id);
    const [formvalue, setFormValue] = useState({ Candidatename: '', Candidate_owner_name: '', Candidate_Filed: '', Candidate_choice: '', availability: '', adminid: userId });
    const [msg, setMsg] = useState('');
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setFormValue({ ...formvalue, [e.target.name]: e.target.value });
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            Candidatename: formvalue.Candidatename,
            Candidate_owner_name: formvalue.Candidate_owner_name,
            Candidate_Filed: formvalue.Candidate_Filed,
            Candidate_choice: formvalue.Candidate_choice,
            availability: formvalue.availability,
            adminid: formvalue.adminid
        };
      
        try {
            const req = await axios.post("http://localhost/react_cured_api/api/certi_detail.php", formData);
            console.log(req.data.suc);
            setMsg(req.data.suc);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const req = await fetch(`http://localhost/react_cured_api/api/cate.php?adminid=${formvalue.adminid}`);
            const res = await req.json();
            if (res && res.cate) {
                console.log(res.cate);
                setUserData(res.cate); // Assuming the array of categories is stored in res.cate
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <Headers />
                <form className="form_com" onSubmit={handleSubmit}>
                    <h2>Submit form</h2>
                    <h4 style={{color:'green'}}>{msg}</h4>
                    <div>
                        <input type="text" name="Candidatename" value={formvalue.Candidatename} placeholder="Candidate Holder Name" onChange={handleInput} />
                    </div>
                    <div>
                        <input type="text" name="Candidate_owner_name" value={formvalue.Candidate_owner_name} placeholder="Candidate owner Name" onChange={handleInput} />
                    </div>
                    <div>
                        <input type="text" name="Candidate_Filed" value={formvalue.Candidate_Filed} placeholder="Candidate Filed" onChange={handleInput} />
                    </div>
                    <div>
                    {/* <select name="Candidate_choice" id="categories" value={formvalue.Candidate_choice} onChange={handleInput}> */}
                    <select name="Candidate_choice" id="categories" value={formvalue.Candidate_choice} onChange={handleInput}>
    {userData.map(category => (
        category.active === "Yes" ? (
        <option key={category.id} value={category.cate_name} selected={category.active === "Yes"}>
            {category.cate_name}
        </option>
        ) : null
    ))}
    </select>
                    </div>
                    <div style={{ display: 'flex', fontSize: '20px', width: '50%', justifyContent: 'space-around', margin: '5%' }}>
                        <div>
                            <input type="radio" id="yes" value="Yes" name="availability" checked={formvalue.availability === "Yes"} onChange={handleInput} /> Yes
                        </div>
                        <div>
                            <input type="radio" id="no" value="No" name="availability" checked={formvalue.availability === "No"} onChange={handleInput} /> No
                        </div>
                    </div>
                    <label htmlFor="adminid"></label>
                    <input type="hidden" id="adminid" name="adminid" value={formvalue.adminid} readOnly />
                    <button type="submit">Submit</button>
                </form>
            </>
    );
}

export default CertificateForm;
