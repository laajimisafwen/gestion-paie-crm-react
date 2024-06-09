import React, { useState, useEffect } from 'react';
import "./CalculePaieForm.css";

const CalculePaieForm = ({ onAddOrUpdateSalarie, salarieToEdit, onFormClose }) => {
    const [newSalarie, setNewSalarie] = useState({
        jours_absence: '',
        jours_congé: '',
        jours_feries: '',
        heures_sup_1: '',
        heures_sup_2: '',
        heures_sup_3: '',
        heures_sup_4: '',
        heures_sup_5: '',
        nbr_tickets: '',
        avances: '',
        prets: '',
        prime_presence: '',
        prime_transport: '',
    });

    useEffect(() => {
        setNewSalarie(salarieToEdit);
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
        onAddOrUpdateSalarie(newSalarie, salarieToEdit._id);
        onFormClose();
    };

    return (
        <form onSubmit={handleSubmit} className="add-salarie-form">
            <hr />
            <h1>Données de paies</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="jours_absence">Jours d'absence:</label>
                <input type="number" id="jours_absence" name="jours_absence" defaultValue={newSalarie.jours_absence} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="jours_congé">Jours de congé:</label>
                <input type="number" id="jours_congé" name="jours_congé" defaultValue={newSalarie.jours_congé} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="jours_feries">Jours fériés:</label>
                <input type="number" id="jours_feries" name="jours_feries" defaultValue={newSalarie.jours_feries} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="heures_sup_1">Heures suppl. 1 (75%):</label>
                <input type="number" id="heures_sup_1" name="heures_sup_1" defaultValue={newSalarie.heures_sup_1} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="heures_sup_2">Heures suppl. 2 (100%):</label>
                <input type="number" id="heures_sup_2" name="heures_sup_2" defaultValue={newSalarie.heures_sup_2} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="heures_sup_3">Heures suppl. 3 (25%):</label>
                <input type="number" id="heures_sup_3" name="heures_sup_3" defaultValue={newSalarie.heures_sup_3} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="heures_sup_4">Heures suppl. 4 (50%):</label>
                <input type="number" id="heures_sup_4" name="heures_sup_4" defaultValue={newSalarie.heures_sup_4} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="heures_sup_5">Heures suppl. 5 (0%):</label>
                <input type="number" id="heures_sup_5" name="heures_sup_5" defaultValue={newSalarie.heures_sup_5} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="nbr_tickets">Nombre de tickets restaurant:</label>
                <input type="number" id="nbr_tickets" name="nbr_tickets" defaultValue={newSalarie.nbr_tickets} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="avances">Avances:</label>
                <input type="number" id="avances" name="avances" defaultValue={newSalarie.avances} onChange={handleChange} />
            </div>

            <div className="form-row">
                <label htmlFor="prets">Prêts:</label>
                <input type="number" id="prets" name="prets" defaultValue={newSalarie.prets} onChange={handleChange} />
            </div>

            <hr />
            <h1>Primes</h1>
            <hr />

            <div className="form-row">
                <label htmlFor="prime_presence">Prime de présence:</label>
                <input type="number" id="prime_presence" name="prime_presence" defaultValue={newSalarie.prime_presence} onChange={handleChange} required />
            </div>

            <div className="form-row">
                <label htmlFor="prime_transport">Prime de transport:</label>
                <input type="number" id="prime_transport" name="prime_transport" defaultValue={newSalarie.prime_transport} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">
                Modifier
            </button>
            <button type="button" onClick={onFormClose}>Cancel</button>
        </form>
    );
};

export default CalculePaieForm;
