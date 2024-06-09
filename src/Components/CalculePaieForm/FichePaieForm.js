import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import { PDFDocument } from 'pdf-lib';

const FichePaieForm = ({ salarieToEdit }) => {
    const [pdfUrl, setPdfUrl] = useState('');
    const userId = JSON.parse(localStorage.getItem('user')).admin ? JSON.parse(localStorage.getItem('user')).admin : JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        const fetchSalariesAndCreatePdf = async () => {
            try {
                // Fetch the salaries information from the backend
                const response = await fetch(`http://localhost:3001/api/user/getsalaries/${salarieToEdit}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const salaries = await response.json();

                // Fetch the PDF with empty tables
                const existingPdfBytes = await fetch('/fiche_de_paie.pdf').then(res => {
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


                const fullName = `${salaries.nom} ${salaries.prenom}`;
                // Insert the full name, matricule, and salaire into the table
                page.drawText(fullName, { x: xOffset + 112, y: yPos + 10, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.matricule, { x: xOffset + 85, y: yPos + 24, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.fonction, { x: xOffset + 85, y: yPos - 4, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.cnss, { x: xOffset + 85, y: yPos - 58, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.cin, { x: xOffset + 78, y: yPos - 73, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.chef_famille ? "Oui" : "Non", { x: xOffset + 110, y: yPos - 87, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.salaire_mensuel, { x: xOffset + 500, y: yPos - 150, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.salaire_mensuel, { x: xOffset + 500, y: yPos - 235, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.prime_presence, { x: xOffset + 500, y: yPos - 185, size: fontSize }); // Adjust x accordingly
                page.drawText(salaries.prime_transport, { x: xOffset + 500, y: yPos - 210, size: fontSize }); // Adjust x accordingly
                page.drawText('837.37', { x: xOffset + 650, y: yPos - 370, size: fontSize }); // Adjust x accordingly



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
                <h2>Fiche de Paie</h2>
                {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" title="Journal de Paie"></iframe>}
            </div>
        </>

    );
};

export default FichePaieForm;
