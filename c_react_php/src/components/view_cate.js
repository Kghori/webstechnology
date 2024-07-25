// import React, { useState, useEffect } from "react";
// import Headers from './header';
// import Footer from './footer';

// function View_cate() {
//     const [userData, setUserData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         getUserData();
//     }, []);

//     const getUserData = async () => {
//         try {
//             const req = await fetch("http://localhost/react_cured_api/api/cate.php");
//             const res = await req.json();
//             if (res && res.cate) {
//                 setUserData(res.cate); // Assuming the array of categories is stored in res.cate
//                 setIsLoading(false); // Set loading state to false once data is fetched
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setIsLoading(false); // Set loading state to false on error
//         }
//     }

//     return (
//         <>
//             <Headers />
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <table style={{ border: '1px solid black' }}>
//                         <thead>
//                             <tr>
//                                 <th>no</th>
//                                 <th>cate name</th>
//                                 <th>active</th>
//                                 <th>update</th>
//                                 <th>delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {userData.length > 0 ? (
//                                 userData.map((udata, index) => {
//                                     return (
//                                         <tr key={userData.id}>
//                                             <td>{index + 1}</td>
//                                             <td>{userData.cate_name}</td>
//                                             <td>{userData.active}</td>
//                                             <td>{/* Add update button */}</td>
//                                             <td>{/* Add delete button */}</td>
//                                         </tr>
//                                     );
//                                 })
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5">No data available</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                     <Footer />
//                 </>
//             )}
//         </>
//     );
// }

// export default View_cate;





import React, { useState, useEffect } from "react";

import Headers from './header';
import Footer from './footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userId } from "./session";
import axios from "axios";


function View_cate() {
    const { id } = useParams();
    console.log(id);
    const [userData, setUserData] = useState([]);
    const [formvalue,setFormValue]=useState({adminid:userId});
    const handleChange = (e) => {
        setFormValue({...formvalue, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        getUserData();
    },[]);

    const getUserData = async () => {
               const req = await fetch(`http://localhost/react_cured_api/api/cate.php?adminid=${formvalue.adminid}`);
            const res = await req.json();
            if (res && res.cate) {
                // console.log("id", formvalue.adminid);
                console.log(res.cate);
                setUserData(res.cate); // Assuming the array of categories is stored in res.cate
            }
     }
    //  const handlesubmit=async(e)=>{
    //     e.preventDefault();
    //     const formData= {adminid:formvalue.adminid}; 
    //         const req= await axios.post("http://localhost/react_cured_api/api/cate.php",formData);
    //         console.log(req);
    //         let responnce=await req.json();
    //         console.log(responnce);
    //     }
        const handleDelete = async (id) => {
            try {
                const reqdel = await axios.delete(`http://localhost/react_cured_api/api/cate.php?deid=${id}`);
                console.log(reqdel.data); // Access response data using reqdel.data
                const responseData = reqdel.data; // Response data
                if (responseData && responseData.cate) {
                    setUserData(responseData.cate);
                }
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
        

    return (
        <>
        
            <Headers />
            <form>
           {/* <label htmlFor="adminid">Admin ID:</label> */}
           
           <input type="hidden" id="adminid" name="adminid"  onChange = {handleChange} value={formvalue.adminid} readOnly />
            <div className="con">      
                  <table style={{ border: '1px solid black', margin:'5% 5% 5% 35%' }}>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>cate name</th>
                        <th>active</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                
    {userData.length > 0 ? (
        userData.map((udata) => {
            const { id, cate_name, active} = udata;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{cate_name}</td>
                    <td>{active}</td>
                  
                    
                    <td>
                        <Link to={"/Edit_cate/" + id} className="btn btn-success mx-2">Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={ ()=>handleDelete(id)}>Delete</button>
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="3">No data available</td>
        </tr>
    )}
</tbody>
            </table>
            </div>

            </form>
            <Footer/>
        </>
    );
}

export default View_cate;
