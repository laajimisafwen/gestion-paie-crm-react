import Navbar from "../../Components/Navbar/Navbar";
import React, { useState, useEffect } from 'react';
import './FicheEntreprise.css';

const FicheEntreprise = () => {
    const [userData, setUserData] = useState({
        societe: '',
        fullname: '',
        address: '',
        pays: '',
        tel: '',
        email: '',
        cnss: '',
        matricule: '',
        rcommerce: '',
        rib: '',
        assurence: false,
        mois13: false,
        cavis: false,
    });
    const [admin, setAdmin] = useState(null);

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
        const fetchAdmin = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                const userString = result.admin !== null ? result : JSON.parse(localStorage.getItem('user'));
                console.log(userString);

                if (userString) {
                    setUserData(prevUserData => ({
                        ...prevUserData,
                        ...userString,
                    }));
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };

        fetchAdmin();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/user/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email, updates: userData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            localStorage.setItem('user', JSON.stringify(result.user));
            alert(result.message);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3 className="form-section-header">Informations personnelles</h3>
                        <div className="form-group">
                            <label htmlFor="societe">Société</label>
                            <input
                                type="text"
                                id="societe"
                                name="societe"
                                value={userData.societe}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullName">Nom et prénom</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={userData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Adresse</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pays">Pays</label>
                            <input
                                type="text"
                                id="pays"
                                name="pays"
                                value={userData.pays}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Tel</label>
                            <input
                                type="tel"
                                id="tel"
                                name="tel"
                                value={userData.tel}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-section">
                        <h3 className="form-section-header">Informations juridiques</h3>
                        <div className="form-group">
                            <label htmlFor="cnss">N° CNSS</label>
                            <input
                                type="text"
                                id="cnss"
                                name="cnss"
                                value={userData.cnss}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricule">Matricule Fiscale</label>
                            <input
                                type="text"
                                id="matricule"
                                name="matricule"
                                value={userData.matricule}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rcommerce">Registre de commerce</label>
                            <input
                                type="text"
                                id="rcommerce"
                                name="rcommerce"
                                value={userData.rcommerce}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rib">RIB</label>
                            <input
                                type="text"
                                id="rib"
                                name="rib"
                                value={userData.rib}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assurance">Assurance Groupe</label>
                            <input
                                type="checkbox"
                                name="assurence"
                                checked={userData.assurence}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mois13">13ème mois</label>
                            <input
                                type="checkbox"
                                id="mois13"
                                name="mois13"
                                checked={userData.mois13}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cavis">CAVIS</label>
                            <input
                                type="checkbox"
                                id="cavis"
                                name="cavis"
                                checked={userData.cavis}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Enregistrer</button>
                </form>
            </div>
        </>

    );
};

export default FicheEntreprise;
