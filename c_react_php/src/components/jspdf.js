import React from 'react';
import { jsPDF } from 'jspdf';

function Jspdf() {
    function myPrint() {
        const doc = new jsPDF({
          orientation: 'landscape', // portrait or landscape
          unit: 'mm', // measurement unit
          format: 'a0', // page size
        });
      
        // Define HTML content with embedded CSS styles
        const htmlContent = `
          <html>
          <head>
            <style>
            body {
                font-family: 'Times New Roman', Times, serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
              }
              
              .certificate {

                width: 600px; /* Reduced width */
                margin: 50% auto;
                background-color: #000;
                padding: 20px;
             
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                page-break-inside: avoid; /* Prevent breaking the div across pages */
              }
              
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              
              .header h1 {
                margin: 5px 0;
                font-size: 28px; /* Reduced font size */
                text-transform: uppercase;
              }
              
              .header p {
                margin: 0;
                font-size: 16px; /* Reduced font size */
              }
              
              .content {
                margin-bottom: 20px; /* Reduced margin */
                padding: 0 20px;
              }
              
              .content p {
                text-align: justify;
                line-height: 1.6;
                margin-bottom: 10px; /* Reduced margin */
                font-size: 14px; /* Reduced font size */
              }
              
              .signature {
                display: block;
                margin: 0 auto;
                margin-top: 20px; /* Reduced margin */
                width: 150px; /* Reduced width */
              }
             </style>
          </head>
          <body>
            <div class="certificate">
              <div class="header">
                <h5>Certificate of Achievement</h5>
                <p>This is to certify that</p>
              </div>
              <div class="content">
                <p>This is to certify that</p>
                <h2>John Doe</h2>
                <p>has successfully completed the course on Web Development</p>
                <p>Given this 15th day of May, 2024</p>
              </div>
            </div>
          </body>
          </html>
        `;
      
        // Add HTML content to PDF and save
        doc.html(htmlContent, {
          callback: function (doc) {
            doc.save('certificate.pdf');
          }
        });
      }
         
  return (
    <>
      <h1>View Certificate</h1>  
      <button className="btn float-end" id="btn" onClick={myPrint}>Print</button>
    </>
  );
}

export default Jspdf;
