// import React from 'react';
// import axios from "axios";
import Headers from './header';
import Footer from './footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userId } from "./session";
import axios from "axios";
// import './cerificate.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useState, useEffect } from "react";
 function View_carti(){
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [formvalue,setFormValue]=useState({adminid:userId});
    const [msg,setmsg]=useState('');
    const handleChange = (e) => {
        setFormValue({...formvalue, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
               const req = await fetch(`http://localhost/react_cured_api/api/certi_detail.php?adminid=${formvalue.adminid}`);
            const res = await req.json();
            if (res && res.cate) {
                console.log("id", formvalue.adminid);
                console.log(res.cate);
                setUserData(res.cate); // Assuming the array of categories is stored in res.cate
            }
     }
    //  const handlesubmit=async(e)=>{
    //     e.preventDefault();
    //     const formData= {adminid:formvalue.adminid}; 
    //         const req= await axios.post("http://localhost/react_cured_api/api/certi_detail.php",formData);
    //         console.log(req);
    //         // let responnce=await req.json();
    //         // console.log(responnce);
    //     }
        const handleDelete = async (no) => {
            try {
                console.log(no);
                const reqdel = await axios.delete(`http://localhost/react_cured_api/api/certi_detail.php?deid=${no}`);
                console.log(reqdel.data); // Access response data using reqdel.data
                const responseData = reqdel.data; // Response data
                if (responseData && responseData.cate) {
                    setUserData(responseData.cate);
                }
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
        // const generateCertificate = (no) => {
        //     if (userData.length > 0) {
        //         // Create a new PDF instance
        //         const doc = new jsPDF();
        
        //         // Find the userData object corresponding to the provided no
        //         const udata = userData.find(item => item.no === no);
        //         if (!udata) {
        //             console.log('Data not found for no:', no);
        //             return;
        //         }
        
        //         const { cname, cfield } = udata;
        
        //         // Add content to the PDF
        //         doc.text(`${cname}`, 105, 15, { align: 'center' });
        //         doc.text(`This certifies that ${cfield}`, 105, 30, { align: 'center' });
        //         doc.text('John Doe', 105, 45, { align: 'center' });
        //         doc.text('has successfully completed', 105, 60, { align: 'center' });
        //         doc.text(`the ${cfield} Course`, 105, 75, { align: 'center' });
        
        //         // Save the PDF
        //         const fileName = `certificate_${cname}.pdf`;
        //         const outputPath = 'certificates'; // Specify the output path here (relative path)
        //         const filePath = `${outputPath}/${fileName}`;
        //         doc.save(filePath);
        //     } else {
        //         // No data available
        //         console.log('No data available');
        //     }
        // };
        const generateCertificate = async (no) => {
            if (userData.length > 0) {
                // Create a new PDF instance
                const doc = new jsPDF();
        
                // Find the userData object corresponding to the provided no
                const udata = userData.find(item => item.no === no);
                if (!udata) {
                    console.log('Data not found for no:', no);
                    return;
                }
        
                const { cname, cfield } = udata;
        
                // Add content to the PDF
                doc.text(`${cname}`, 105, 15, { align: 'center' });
                doc.text(`This certifies that ${cfield}`, 105, 30, { align: 'center' });
                doc.text('John Doe', 105, 45, { align: 'center' });
                doc.text('has successfully completed', 105, 60, { align: 'center' });
                doc.text(`the ${cfield} Course`, 105, 75, { align: 'center' });
        
                    
                // Save the PDF locally
                const fileName = `certificate_${cname}.pdf`;
                // doc.save(fileName);
        
                // Upload PDF to the database
                const formData = new FormData();
        
                // Append the PDF file
                formData.append('file', doc.output('blob'), fileName);
        
                // Append additional data separately
                formData.append('cname', cname); // Append cname separately
                formData.append('userId', userId); // Append userId separately
        
                try {
                    // Specify the full URL for the upload endpoint including userId
                    const uploadResponse = await axios.post(`http://localhost/react_cured_api/api/upload.php?userId=${userId}`, formData);
                    console.log('Upload response:', uploadResponse.data);
                    // Handle response as needed
                } catch (error) {
                    console.error('Error uploading PDF:', error);
                }
            } else {
                // No data available
                console.log('No data available');
            }
        };
        
             return(<>
       <>
            <Headers />
            <form>
           {/* <label htmlFor="adminid">Admin ID:</label> */}
           
           <input type="hidden" id="adminid" name="adminid"  onChange = {handleChange} value={formvalue.adminid} readOnly />
       
            <table style={{ border: '1px solid black' }}>
                <thead >
                    <tr>
                        <td><th>no</th></td>
                        <td><th>Candidate Name</th></td>
                        <td><th>Candidate Owner Name</th></td>
                        <td><th>Candidate Field</th></td>
                        <td><th>Choice</th></td>
                        <td><th>availability</th></td>
                        <td><th>Update</th></td>
                        <td><th>Delete</th></td>
                        <td><th>Genetate Pdf</th></td>
                    </tr>
                </thead>
                <tbody>
                
    {userData.length > 0 ? (
        userData.map((udata) => {
            const { no,cname,cfield,choice,available} = udata;
            return (
                <tr key={no}>
                    <td>{no}</td>
                    <td>{cname}</td>
                    <td>{cname}</td>
                    <td>{cfield}</td>
                    <td>{choice}</td>
                    <td>{available}</td>
                  
                    
                    <td>
                    <Link to={"/Edit_certi/" + no} className="btn btn-success mx-2">Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={ ()=>handleDelete(no)}>Delete</button>
                        
                    </td>
                    <td>  <button onClick={()=>generateCertificate(no)}>Generate Certificate</button>
                    </td>
                    
                    <Link to={"/view_data/" + no} className="btn btn-success mx-2">view data</Link>
                    
                    <td>    
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
          
            </form>
            <Footer/>
        </>
    </>);
}
export default View_carti;