import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import './Parametre.css';

const Parametre = () => {
    const [parameters, setParameters] = useState({});

    const [userData, setUserData] = useState({
        _id: ''
    });

    const labels = [
        "",
        "",
        "Taux de cotisation CNSS (employeur)",
        "Taux de cotisation CNSS (salarié)",
        "Taux de cotisation Accident de travail",
        "Limite du salaire non imposable",
        "Taux minimum de cotisation CNSS pour la tranche exonérée (employeur )",
        "Taux employeur",
        "Taux salarié",
        "Nombre de jours par mois",
        "Nombre d'heures par jour",
        "Nombre d'heures par mois",
        "Taux de retenue à la source pour les expatriés",
        "Création de fiches de paie : Nombre de salariés par tranche",
        "1er Taux de majoration des heures de nuit",
        "2ème Taux de majoration des heures de nuit",
        "1er Taux de majoration des heures supplémentaires",
        "2ème Taux de majoration des heures supplémentaires",
        "3ème Taux de majoration des heures supplémentaires",
        "4ème Taux de majoration des heures supplémentaires",
        "5ème Taux de majoration des heures supplémentaires",
    ];

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    useEffect(() => {
        try {
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString);
                setUserData({ _id: user.admin ? user.admin : user._id });
            }
        } catch (error) {
            console.error('Failed to parse user data:', error);
        }
    }, []);

    useEffect(() => {
        const fetchParameters = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/parametres/${userData._id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setParameters(data);
            } catch (error) {
                console.error('Error fetching parameters:', error);
            }
        };

        if (userData._id) {
            fetchParameters();
        }
    }, [userData._id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/user/parametres/${parameters._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error updating parameters:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='parametre-container'>
                <form onSubmit={handleSubmit} className="parameters-form">
                    {Object.keys(parameters).map((key, index) => {
                        if (key !== '_id' && key !== 'userId' && key !== "__v") {
                            return (
                                <div key={key} className="form-group">
                                    <label htmlFor={key} className="form-label">{labels[index]}</label>
                                    <input
                                        type="number"
                                        id={key}
                                        name={key}
                                        value={parameters[key]}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                    <button type="submit" className="submit-button">Enregistrer</button>
                </form>
            </div>
        </>

    );
};

export default Parametre;
