import React, { useState, useEffect } from 'react';
import "./SalariesForm.css";

const AddSalariesForm = ({ onAddOrUpdateSalarie, salarieToEdit, onFormClose }) => {
    const [newSalarie, setNewSalarie] = useState({
        nom: '',
        prenom: '',
        cin: '',
        address: '',
        tel: '',
        cnss: '',
        codeAnalytique: '',
        dateNaissance: '',
        rib: '',
        email: '',
        matricule: '',
        chef_famille: false,
        parent_charge: false,
        enfant1: false,
        enfant2: false,
        fonction: '',
        categorie: '',
        echelon: '',
        date_contrat: '',
        regime: 'Ordinaire',
        payment_mode: 'Virement bancaire',
        mois13: true,
        salaire_mensuel: '1000',
        prime_presence: '',
        prime_transport: '',
    });

    useEffect(() => {
        setNewSalarie(salarieToEdit || {
            nom: '',
            prenom: '',
            cin: '',
            address: '',
            tel: '',
            cnss: '',
            codeAnalytique: '',
            dateNaissance: '',
            rib: '',
            email: '',
            matricule: '',
            chef_famille: false,
            parent_charge: false,
            enfant1: false,
            enfant2: false,
            fonction: '',
            categorie: '',
            echelon: '',
            date_contrat: '',
            regime: 'Ordinaire',
            payment_mode: 'Virement bancaire',
            mois13: true,
            salaire_mensuel: '1000',
            prime_presence: '',
            prime_transport: '',
        });
    }, [salarieToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewSalarie({
            ...newSalarie,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOrUpdateSalarie(newSalarie, salarieToEdit?._id);
        onFormClose();
    };

    return (
        <form onSubmit={handleSubmit} className="add-salarie-form">
            <hr />
            <h1>Informations Personnelles</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="nom">Nom:</label>
                <input type="text" id="nom" name="nom" value={newSalarie.nom} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="prenom">Prénom:</label>
                <input type="text" id="prenom" name="prenom" value={newSalarie.prenom} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="cin">CIN:</label>
                <input type="text" id="cin" name="cin" value={newSalarie.cin} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="address">Adresse:</label>
                <input type="text" id="address" name="address" value={newSalarie.address} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="tel">Téléphone:</label>
                <input type="tel" id="tel" name="tel" value={newSalarie.tel} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="cnss">CNSS:</label>
                <input type="text" id="cnss" name="cnss" value={newSalarie.cnss} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="codeAnalytique">Code Analytique:</label>
                <input type="text" id="codeAnalytique" name="codeAnalytique" value={newSalarie.codeAnalytique} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="dateNaissance">Date de Naissance:</label>
                <input type="date" id="dateNaissance" name="dateNaissance" value={newSalarie.dateNaissance} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="rib">RIB:</label>
                <input type="text" id="rib" name="rib" value={newSalarie.rib} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={newSalarie.email} onChange={handleChange} />
            </div>

            <hr />
            <h1>Situation Familiale</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="chef_famille">Chef de famille:</label>
                <input type="checkbox" id="chef_famille" name="chef_famille" checked={newSalarie.chef_famille} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="parent_charge">Parent à charge:</label>
                <input type="checkbox" id="parent_charge" name="parent_charge" checked={newSalarie.parent_charge} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="enfant1">Enfant 1:</label>
                <input type="checkbox" id="enfant1" name="enfant1" checked={newSalarie.enfant1} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="enfant2">Enfant 2:</label>
                <input type="checkbox" id="enfant2" name="enfant2" checked={newSalarie.enfant2} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="matricule">Matricule:</label>
                <input type="text" id="matricule" name="matricule" value={newSalarie.matricule} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="fonction">Fonction:</label>
                <input type="text" id="fonction" name="fonction" value={newSalarie.fonction} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="categorie">Catégorie:</label>
                <input type="text" id="categorie" name="categorie" value={newSalarie.categorie} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="echelon">Échelon:</label>
                <input type="text" id="echelon" name="echelon" value={newSalarie.echelon} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="date_contrat">Date du contrat:</label>
                <input type="date" id="date_contrat" name="date_contrat" value={newSalarie.date_contrat} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="regime">Régime:</label>
                <select id="regime" name="regime" value={newSalarie.regime} onChange={handleChange}>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                    <option value="Ordinaire">Ordinaire</option>
                </select>
            </div>

            <div className="form-row">
                <label htmlFor="payment_mode">Mode de paiement:</label>
                <select id="payment_mode" name="payment_mode" value={newSalarie.payment_mode} onChange={handleChange}>
                    <option value="Virement bancaire">Virement bancaire</option>
                    <option value="Virement bancaire">Virement bancaire</option>
                    <option value="Virement bancaire">Virement bancaire</option>
                </select>
            </div>

            <div className="form-row">
                <label htmlFor="mois13">13ème mois:</label>
                <input type="checkbox" id="mois13" name="mois13" checked={newSalarie.mois13} onChange={handleChange} />
            </div>

            <hr />
            <h1>Salaire</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="salaire_mensuel">Salaire mensuel:</label>
                <input type="text" id="salaire_mensuel" name="salaire_mensuel" value={newSalarie.salaire_mensuel} onChange={handleChange} />
            </div>

            <hr />
            <h1>Primes</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="prime_presence">Prime de présence:</label>
                <input type="text" id="prime_presence" name="prime_presence" value={newSalarie.prime_presence} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="prime_transport">Prime de transport:</label>
                <input type="text" id="prime_transport" name="prime_transport" value={newSalarie.prime_transport} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">
                {salarieToEdit ? 'Modifier Salarié' : 'Ajouter Salarié'}
            </button>
            <button type="button" onClick={onFormClose}>Cancel</button>
        </form>
    );
};

export default AddSalariesForm;
