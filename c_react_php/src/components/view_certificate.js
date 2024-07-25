import React from 'react';
import html2pdf from 'html2pdf.js'; // Correct import for html2pdf
import { Link } from 'react-router-dom';
import './view_data.css';

function ViewCertificate() {
  function myPrint() {
    const element = document.querySelector(".certificate");

    html2pdf()
      .from(element)
      .save();
  }

  return (
    <>
      <h1>View Certificate</h1>  
    
      <section id="about">
        <div className="container p-1">
          <div className="row justify-content-center" id="invoice">
            <div className="col-md-10">

              <form id="myfrm">
                <div className="certificate">
                  <div className="header">
                    <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Certificate of Achievement</h1>
                    <p>This is to certify that</p>
                  </div>
                  <div className="content">
                    <p>This is to certify that</p>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>John Doe</h2>
                    <p>has successfully completed the course on Web Development</p>
                    <p>Given this 15th day of May, 2024</p>
                  </div>
                </div>
              </form>

              <button className="btn float-end" id="btn" onClick={myPrint}>Print</button>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewCertificate;
