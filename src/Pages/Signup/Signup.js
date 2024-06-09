import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        societe: "",
        fullname: "",
        address: "",
        pays: "",
        tel: "",
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
            return;
        }

        const dataToSend = {
            societe: formData.societe,
            fullname: formData.fullname,
            address: formData.address,
            pays: formData.pays,
            tel: formData.tel,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorText = await response.text();
                setSubmitError(errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitError(error.toString());
        }
    };

    return (
        <div className='form-container-signup'>
            <h1>Inscription</h1>
            <h3>Pour pouvoir vous inscrir et tester les fonctionalités de Paie Tunisie veuillez remplir le formulaire suivant :</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Société:</label>
                    <input
                        type="text"
                        name="societe"
                        value={formData.societe}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom et prénom:</label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Adresse:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        name="pays"
                        value={formData.pays}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tel:</label>
                    <input
                        type="text"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <div>
                    <label>Confirmation du mot de passe:</label>
                    <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                    />
                    {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                </div>
                <div className='submition'>
                    <button type="submit">Enregistrer</button>
                    <div className='signin'>
                        <p>J'ai déjà un compte?</p>
                        <Link to="/login" className='login-button'>Connexion</Link>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Signup;
