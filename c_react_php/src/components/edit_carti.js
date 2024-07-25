import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userId } from './session';
import { useParams } from 'react-router-dom';
import Headers from './header';
import Footer from './footer';
import axios from "axios";

function Edit_certi() {
    const { no } = useParams();
    const navigate = useNavigate();
    const [formvalue, setFormValue] = useState({ Candidatename: '', Candidate_owner_name: '', Candidate_Filed: '', Candidate_choice: '', availability: '', adminid: userId });
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        fetchData();
        getUserData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost/react_cured_api/api/certi_detail.php?certiid=${no}`);
            const data = await response.json();
            const userDataFromApi = data.cate[0]; // Assuming only one item is fetched
            setUserData([userDataFromApi]); // Initialize userData as an array with one object
            setFormValue({
                Candidatename: userDataFromApi.cname,
                Candidate_owner_name: userDataFromApi.coname,
                Candidate_Filed: userDataFromApi.cfield,
                Candidate_choice: userDataFromApi.choice,
                availability: userDataFromApi.available,
                adminid: userDataFromApi.adminid
            }); // Initialize form with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInput = (e) => {
        setFormValue({ ...formvalue, [e.target.name]: e.target.value });
    };

    const getUserData = async () => {
        try {
            const req = await fetch(`http://localhost/react_cured_api/api/cate.php?adminid=${formvalue.adminid}`);
            const res = await req.json();
            if (res && res.cate) {
                console.log(res.cate);
                setUserData(res.cate);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = {
            no: no,
            Candidatename: formvalue.Candidatename,
            Candidate_owner_name: formvalue.Candidate_owner_name,
            Candidate_Filed: formvalue.Candidate_Filed,
            Candidate_choice: formvalue.Candidate_choice,
            availability: formvalue.availability
        };
        try {
            const req = await axios.put("http://localhost/react_cured_api/api/certi_detail.php", formdata);
            console.log(req);
            // Redirect to another page after submission if needed
            // navigate('/success'); // Replace '/success' with your desired route
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <> 
         <Headers />
            <form className="form_com" onSubmit={handleSubmit}>
                <h2>Submit Form</h2>
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
                <div>
                    <input type="radio" id="yes" value="Yes" name="availability" checked={formvalue.availability === "Yes"} onChange={handleInput} /> Yes
                    <input type="radio" id="no" value="No" name="availability" checked={formvalue.availability === "No"} onChange={handleInput} /> No
                </div>
                <div>
                    <label htmlFor="adminid">Admin ID:</label>
                    <input type="text" id="adminid" name="adminid" value={formvalue.adminid} readOnly />
                </div>
                <button type="submit">Submit</button>
            </form>
        <Footer/></>
    );
}

export default Edit_certi;
