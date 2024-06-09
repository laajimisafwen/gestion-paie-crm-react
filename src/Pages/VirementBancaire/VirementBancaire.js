import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import { PDFDocument } from 'pdf-lib';
import "./VirementBancaire.css"

const VirementBancaire = () => {
    const [pdfUrl, setPdfUrl] = useState('');
    const userId = JSON.parse(localStorage.getItem('user'))._id;

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
                const existingPdfBytes = await fetch('/virement.pdf').then(res => {
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
                let yPos = 390; // Y position where you'll start inserting text, adjust as necessary
                const xOffset = 70; // X offset for your columns

                salaries.forEach((salarie, index) => {
                    const fullName = `${salarie.nom} ${salarie.prenom}`;
                    // Insert the full name, matricule, and salaire into the table
                    page.drawText(`${index + 1}`, { x: xOffset, y: yPos, size: fontSize });
                    page.drawText(fullName, { x: xOffset + 40, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.cin, { x: xOffset + 220, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.rib, { x: xOffset + 350, y: yPos, size: fontSize }); // Adjust x accordingly
                    page.drawText(salarie.salaire_mensuel, { x: xOffset + 600, y: yPos, size: fontSize });

                    // Move yPos up for the next entry
                    yPos -= 19.75;
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
            <div className='virement'>
                <h2>VIREMENTS BANCAIRES</h2>
                {pdfUrl && <iframe src={pdfUrl} width="80%" height="600px" title="Journal de Paie"></iframe>}
            </div>
        </>

    );
};

export default VirementBancaire;
