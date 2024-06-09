import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import AddSalariesForm from '../../Components/CalculePaieForm/CalculePaieForm';
import FichePaieForm from '../../Components/CalculePaieForm/FichePaieForm';
import Modal from '../../Components/CalculePaieForm/Modal/Modal';
import FicheModal from '../../Components/CalculePaieForm/Modal/FicheModal';
import './CalculeDePaie.css';

const CalculeDePaie = () => {
    const [salaries, setSalaries] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).admin ? JSON.parse(localStorage.getItem('user')).admin : JSON.parse(localStorage.getItem('user'))._id;
    const [showModal, setShowModal] = useState(false);
    const [showFicheModal, setShowFicheModal] = useState(false);
    const [salarieToEdit, setSalarieToEdit] = useState(null);

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    const fetchSalaries = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/getsalaries`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching salaries: ${response.statusText}`);
            }
            const data = await response.json();
            setSalaries(data);
        } catch (error) {
            console.error('Fetching salaries failed:', error);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [userId]);

    const handleEditClick = (salarie) => {
        setSalarieToEdit(salarie);
        setShowModal(true);
    };

    const handleFicheClick = (salarie) => {
        setSalarieToEdit(salarie._id);
        setShowFicheModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSalarieToEdit(null);
    };

    const closeFormModal = () => {
        setShowFicheModal(false);
        setSalarieToEdit(null);
    };

    const handleUpdateSalarie = async (salarieData, id) => {
        await updateSalarie(id, salarieData);
        fetchSalaries();

    };

    const updateSalarie = async (salarieId, salarieData) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/salaries/${salarieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(salarieData),
            });

            if (!response.ok) {
                throw new Error(`Error updating salary: ${response.statusText}`);
            }
            const result = await response.json();
            setSalaries(salaries.map(s => s._id === salarieId ? result.salarie : s));
        } catch (error) {
            console.error('Updating salarie failed:', error);
        }
    };

    const deleteSalarie = async (salarieId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/salaries/${salarieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting salary: ${response.statusText}`);
            }
            setSalaries(salaries.filter(s => s._id !== salarieId));
        } catch (error) {
            console.error('Deleting salarie failed:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-paie-container">
                <Modal isOpen={showModal} onClose={closeModal}>
                    <AddSalariesForm
                        onAddOrUpdateSalarie={handleUpdateSalarie}
                        salarieToEdit={salarieToEdit}
                        onFormClose={closeModal}
                    />
                </Modal>
                <FicheModal isOpen={showFicheModal} onClose={closeFormModal}>
                    <FichePaieForm
                        salarieToEdit={salarieToEdit}
                    />
                </FicheModal>
                <table>
                    <thead>
                        <tr>
                            <th>Matricule</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Jours d'absence</th>
                            <th>Jours de congé</th>
                            <th>Jours fériés</th>
                            <th>Avances</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map((salarie) => (
                            <tr key={salarie._id}>
                                <td>{salarie.matricule}</td>
                                <td>{salarie.nom}</td>
                                <td>{salarie.prenom}</td>
                                <td>{salarie.jours_absence}</td>
                                <td>{salarie.jours_congé}</td>
                                <td>{salarie.jours_feries}</td>
                                <td>{salarie.avances}</td>
                                <td>
                                    <button className='btn' onClick={() => handleEditClick(salarie)}>Edit</button>
                                    <button className='btn' onClick={() => handleFicheClick(salarie)}>Fiche de paie</button>
                                    <button className='btn btn-danger' onClick={() => deleteSalarie(salarie._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CalculeDePaie;
