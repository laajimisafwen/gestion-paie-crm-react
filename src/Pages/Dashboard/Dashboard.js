import Navbar from "../../Components/Navbar/Navbar";
import React, { useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className="home-page">
                <iframe
                    style={{
                        background: '#F1F5F4',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        width: '100%',
                        height: '80vh'
                    }}
                    src="https://charts.mongodb.com/charts-fiche_de_paie-ohcguky/embed/dashboards?id=5023dd3d-a6b2-4870-9a0a-42c7a8da6c8e&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
                    title="Payroll Dashboard"
                    allowFullScreen
                ></iframe>

                <iframe
                    style={{
                        background: '#F1F5F4',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        width: '100%',
                        height: '100vh'
                    }}
                    src="https://charts.mongodb.com/charts-fiche_de_paie-ohcguky/embed/dashboards?id=c2bd9520-9edf-408b-8e8c-6a72986ce5d9&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
                    title="Dashboard Visualization"
                    allowFullScreen
                ></iframe>

            </div>
        </>

    );
};

export default Dashboard;
