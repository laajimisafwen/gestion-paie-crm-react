import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import AddSalariesForm from '../../Components/Salaries Form/SalariesForm';
import Modal from '../../Components/Salaries Form/Modal/Modal';
import './Salaries.css';

const Salaries = () => {
    const [salaries, setSalaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userId = JSON.parse(localStorage.getItem('user')).admin ? JSON.parse(localStorage.getItem('user')).admin : JSON.parse(localStorage.getItem('user'))._id;
    const [showModal, setShowModal] = useState(false);
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

    const handleAddClick = () => {
        setSalarieToEdit(null); // Ki tji bech tziid salarie jdid raja3 les input lkol null
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSalarieToEdit(null);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/salaries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matricule: searchTerm })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
            const data = await response.json();
            setSalaries(data);
        } catch (error) {
            console.error('Searching salary failed:', error);
        }
    };

    const handleAddOrUpdateSalarie = async (salarieData, id) => {
        if (id) {
            await updateSalarie(id, salarieData);
        } else {
            await handleAddSalarie(salarieData);
        }
    };


    const handleAddSalarie = async (salarieData) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/add-salarie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(salarieData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }

            console.log('Salarie added successfully:', await response.json());
        } catch (error) {
            console.error('Error adding salarie:', error);
        }
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
            <div className="form-salarie-container">
                <div className='search-form'>
                
                    <input
                        type="text"
                        placeholder="Recherche par matricule"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Chercher</button>
                    <button onClick={() => {
                        setSearchTerm('');
                        fetchSalaries();
                    }}>Rétablir</button>
                </div>
                <button className='btn' onClick={handleAddClick}>Ajouter un salarié</button>
                <Modal isOpen={showModal} onClose={closeModal}>
                    <AddSalariesForm
                        onAddOrUpdateSalarie={handleAddOrUpdateSalarie}
                        salarieToEdit={salarieToEdit}
                        onFormClose={closeModal}
                    />
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <th>Matricule</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Régime</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map((salarie) => (
                            <tr key={salarie._id}>
                                <td>{salarie.matricule}</td>
                                <td>{salarie.nom}</td>
                                <td>{salarie.prenom}</td>
                                <td>{salarie.regime}</td>
                                <td>
                                    <button className='btn' onClick={() => handleEditClick(salarie)}>Edit</button>
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

export default Salaries;
