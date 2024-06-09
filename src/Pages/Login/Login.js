import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

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

        const dataToSend = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    localStorage.setItem('user', JSON.stringify(data));
                    if (window.location.href === "http://localhost:3000/") {
                        window.location.reload(false);
                    } else {
                        navigate('/');
                    }
                } else {
                    const textData = await response.text();
                    throw new Error('Error: ' + textData);
                }
            } else {
                throw new Error('Login failed: ' + response.statusText);
            }

        } catch (error) {
            console.error('Error:', error);
            setLoginError(error.toString());
        }
    };

    return (
        <div className='form-container-signin'>
            <h1>Connexion</h1>
            <h3>Bienvenu dans notre espace</h3>
            <form onSubmit={handleSubmit}>
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
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <button type="submit">Connexion</button>
            </form>
            <div className='signup'>
                <p>Vous n'avez pas de compte?</p>
                <button>
                    <Link to="/signup">S'inscrire</Link>
                </button>
            </div>
        </div>
    );
}

export default Login;
