import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import axios from 'axios';
import Footer from './footer';

function Edit_cate() {
    const { id } = useParams();
    const [formvalue, setformvalue] = useState({ admincate: '', active: '' });
    const [userData, setUserData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost/react_cured_api/api/cate.php?cateid=${id}`);
            const data = await response.json();
            console.log(data.cate);
            setUserData(data.cate);
            // Assuming only one item is fetched, so directly set formvalue
            setformvalue({
                admincate: data.cate[0].cate_name, // assuming cate_name is the field name
                active: data.cate[0].active // assuming active is the field name
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInput = (e) => {
        setformvalue({ ...formvalue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = { id: id,admincate: formvalue.admincate, active: formvalue.active };
        try {
            const req = await axios.put("http://localhost/react_cured_api/api/cate.php",formdata);
            console.log(req);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Header />
            <h1>Edit Category</h1>
            <div>{id}</div>
            <form  className="form_com"  onSubmit={handleSubmit}>
                <h2>Add Category</h2>
                <div className="form-group">
                    <input type="text" id="username" onChange={handleInput} name="admincate" placeholder="Add categories" value={formvalue.admincate} />
                </div>
                <div style={{ display: 'flex', fontSize: '20px', width: '50%', justifyContent: 'space-around', margin: '5%' }}>
                    <div>
                        <input type="radio" id="yes" value="Yes" name="active" checked={formvalue.active === 'Yes'} onChange={handleInput} /> Yes
                    </div>
                    <div>
                        <input type="radio" id="no" value="No" name="active" checked={formvalue.active === 'No'} onChange={handleInput} /> No
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit">Add Categories</button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default Edit_cate;
