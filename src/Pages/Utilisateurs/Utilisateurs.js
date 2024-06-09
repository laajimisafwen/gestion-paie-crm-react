import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import UtilisateurForm from '../../Components/UtilisateurForm/UtilisateurForm';
import Modal from '../../Components/UtilisateurForm/Modal/Modal';
import './Utilisateurs.css';

const Utilisateurs = () => {
    const [users, setSalaries] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
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
            const response = await fetch(`http://localhost:3001/api/user/${userId}/getsuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }
            const data = await response.json();
            setSalaries(data);
        } catch (error) {
            console.error('Fetching users failed:', error);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [userId]);

    const handleEditClick = (users) => {
        setSalarieToEdit(users);
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

    const handleAddOrUpdateSalarie = async (usersData, id) => {
        if (id) {
            await updateSalarie(id, usersData);
        } else {
            await handleAddSalarie(usersData);
        }
    };


    const handleAddSalarie = async (usersData) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/add-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usersData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }

            fetchSalaries();
        } catch (error) {
            console.error('Error adding users:', error);
        }
    };

    const updateSalarie = async (suserId, usersData) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/suser/${suserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usersData),
            });

            if (!response.ok) {
                throw new Error(`Error updating salary: ${response.statusText}`);
            }
            const result = await response.json();
            setSalaries(users.map(s => s._id === suserId ? result : s));
            fetchSalaries();
        } catch (error) {
            console.error('Updating salarie failed:', error);
        }
    };

    const deleteSalarie = async (suserId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/suser/${suserId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting salary: ${response.statusText}`);
            }
            setSalaries(users.filter(s => s._id !== suserId));
        } catch (error) {
            console.error('Deleting salarie failed:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-user-container">
                <button className='btn' onClick={handleAddClick}>Ajouter un utilisateur</button>
                <Modal isOpen={showModal} onClose={closeModal}>
                    <UtilisateurForm
                        onAddOrUpdateSalarie={handleAddOrUpdateSalarie}
                        salarieToEdit={salarieToEdit}
                        onFormClose={closeModal}
                    />
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>
                                    <button className='btn' onClick={() => handleEditClick(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteSalarie(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Utilisateurs;
