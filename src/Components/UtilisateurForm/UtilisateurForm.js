import React, { useState, useEffect } from 'react';
import "./UtilisateurForm.css";

const UtilisateurForm = ({ onAddOrUpdateSalarie, salarieToEdit, onFormClose }) => {
    const [newUser, setnewUser] = useState({
        "nom": "",
        "prenom": "",
        "email": "",
        "admin": "",
        "operateur_paie": false,
        "operateur_donnees_paie": false,
        "operateur_cnss": false,
        "password": "",
    });

    useEffect(() => {
        setnewUser(salarieToEdit || {
            "nom": "",
            "prenom": "",
            "email": "",
            "admin": userId,
            "operateur_paie": false,
            "operateur_donnees_paie": false,
            "operateur_cnss": false,
            "password": "",
        });
    }, [salarieToEdit]);

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setnewUser({
            ...newUser,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOrUpdateSalarie(newUser, salarieToEdit?._id);
        onFormClose();
    };

    return (
        <form onSubmit={handleSubmit} className="add-salarie-form">
            <hr />
            <h1>Identification</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="nom">Nom:</label>
                <input type="text" id="nom" name="nom" value={newUser.nom} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="prenom">Prénom:</label>
                <input type="text" id="prenom" name="prenom" value={newUser.prenom} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={newUser.email} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="admin">Admin:</label>
                <input type="text" id="admin" name="admin" value={userId} disabled  />
            </div>

            <div className="form-row">
                <label htmlFor="password">password:</label>
                <input type="text" id="password" name="password" onChange={handleChange} />
            </div>

            <hr />
            <h1>Droits d'accès</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="operateur_paie">Opérateur de paie:</label>
                <input type="checkbox" id="operateur_paie" name="operateur_paie" checked={newUser.operateur_paie} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="operateur_donnees_paie">Opérateur de donnees de paie:</label>
                <input type="checkbox" id="operateur_donnees_paie" name="operateur_donnees_paie" checked={newUser.operateur_donnees_paie} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="operateur_cnss">operateur_cnss:</label>
                <input type="checkbox" id="operateur_cnss" name="operateur_cnss" checked={newUser.operateur_cnss} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">
                {salarieToEdit ? 'Modifier' : 'Ajouter'}
            </button>
            <button type="button" onClick={onFormClose}>Cancel</button>
        </form>
    );
};

export default UtilisateurForm;
