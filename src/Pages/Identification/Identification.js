import Navbar from "../../Components/Navbar/Navbar";
import React, { useState, useEffect } from 'react';
import './Identification.css';

const Identification = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const localUserData = JSON.parse(userString);
            setUserData(prevUserData => ({
                ...prevUserData,
                ...localUserData,
            }));
        }
    }, []);

    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitPassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('The new passwords do not match.');
            return false;
        }

        try {
            const response = await fetch('http://localhost:3001/api/user/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, Message: ${errorText}`);
            }

            
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            return true;
        } catch (error) {
            console.error('Error updating password:', error);
            alert(error.message);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let passwordUpdated = false;

        if (passwordData.oldPassword || passwordData.newPassword || passwordData.confirmPassword) {
            passwordUpdated = await handleSubmitPassword();
            if (!passwordUpdated) return;
        }

        try {
            const profileUpdateResponse = await fetch('http://localhost:3001/api/user/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email, updates: { fullname: userData.fullname } }),
            });

            if (!profileUpdateResponse.ok) {
                throw new Error(`HTTP error! status: ${profileUpdateResponse.status}`);
            }

            const result = await profileUpdateResponse.json();
            localStorage.setItem('user', JSON.stringify(result.user));
            alert(result.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container1">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3 className="form-section-header">Informations personnelles</h3>
                        <div className="form-group">
                            <label htmlFor="fullname">Nom et prénom</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={userData.fullname}
                                onChange={handleChangeUser}
                            />
                        </div>
                    </div>
                    <div className="form-section">
                        <h3 className="form-section-header">Identification</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChangeUser}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Ancien mot de passe:</label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nouveau mot de passe:</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmation mot de passe:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChangePassword}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Enregistrer</button>
                </form>
            </div>
        </>
    );
};

export default Identification;
