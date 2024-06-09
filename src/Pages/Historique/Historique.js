import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import { PDFDocument } from 'pdf-lib';
import "./Historique.css"

const Historique = () => {
    const [pdfUrl, setPdfUrl] = useState('');
    const userId = JSON.parse(localStorage.getItem('user')).admin ? JSON.parse(localStorage.getItem('user')).admin : JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    useEffect(() => {
        const fetchSalariesAndCreatePdf = async () => {
            try {
                // Fetch the salaries information from the backend
                const response = await fetch(`http://localhost:3001/api/user/${userId}/getsalaries`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const salaries = await response.json();

                // Fetch the PDF with empty tables
                const existingPdfBytes = await fetch('/projet_LF.pdf').then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to load the PDF template.');
                    }
                    return res.arrayBuffer();
                });

                // Load a PDFDocument from the existing PDF bytes
                const pdfDoc = await PDFDocument.load(existingPdfBytes);


                // Serialize the PDFDocument to bytes
                const pdfBytes = await pdfDoc.save();

                // Create a blob from the PDF bytes and set the URL for the PDF viewer
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);

                // We no longer automatically download the PDF here

            } catch (error) {
                console.error('Error fetching or creating PDF: ', error);
            }
        };

        fetchSalariesAndCreatePdf();
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className='journal'>
                <h2>Historique des mises à jour</h2>
                {pdfUrl && <iframe src={pdfUrl} width="80%" height="600px" title="Journal de Paie"></iframe>}
            </div>
        </>

    );
};

export default Historique;
