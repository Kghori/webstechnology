import React, { useState, useEffect } from 'react';
import User_header from './user_header';

function User_view_pdf() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const req = await fetch('http://localhost/react_cured_api/api/upload.php');
            const res = await req.json();
            if (res && res.cate) {
                setUserData(res.cate);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <>
        <User_header/>
            <h1>User view pdf</h1>
            <form style={{  margin:'10% 10% 10% 20%' }} >
            
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PDF Name</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.length > 0 ? (
                            userData.map((udata) => {
                                const { id, cname, pdfname } = udata;
                                const pdfUrl = `http://localhost/react_cured_api/api/${pdfname}`; // Adjust the URL accordingly
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{pdfname}</td>
                                        <td>{cname}</td>
                                        <td>
                                            <a href={pdfUrl} download>
                                                Download PDF
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default User_view_pdf;
