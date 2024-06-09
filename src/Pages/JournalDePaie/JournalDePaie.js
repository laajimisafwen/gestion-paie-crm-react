import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import { PDFDocument } from 'pdf-lib';
import "./JournalDePaie.css"

const JournalDePaie = () => {
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
                const existingPdfBytes = await fetch('/journal.pdf').then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to load the PDF template.');
                    }
                    return res.arrayBuffer();
                });

                // Load a PDFDocument from the existing PDF bytes
                const pdfDoc = await PDFDocument.load(existingPdfBytes);

                // Define font size
                const fontSize = 10; // Smaller font size

                // Get the first page of the document
                const page = pdfDoc.getPages()[0];

                // Starting positions for the first entry
                let yPos = 458; // Y position where you'll start inserting text, adjust as necessary
                const xOffset = 30; // X offset for your columns

                salaries.forEach((salarie, index) => {
                    const fullName = `${salarie.nom} ${salarie.prenom}`;
                    // Insert the full name, matricule, and salaire into the table
                    page.drawText(`${index + 1}`, { x: xOffset, y: yPos, size: fontSize });
                    page.drawText(fullName, { x: xOffset + 50, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.jours_absence, { x: xOffset + 160, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.jours_congé, { x: xOffset + 220, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.jours_feries, { x: xOffset + 288, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.nbr_tickets, { x: xOffset + 360, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.avances, { x: xOffset + 460, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.prets, { x: xOffset + 560, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.date, { x: xOffset + 660, y: yPos, size: fontSize }); // Adjust x accordingly

                    // Move yPos up for the next entry
                    yPos -= 17.5;
                });

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
                <h2>Journal de Paie</h2>
                {pdfUrl && <iframe src={pdfUrl} width="80%" height="600px" title="Journal de Paie"></iframe>}
            </div>
        </>

    );
};

export default JournalDePaie;
