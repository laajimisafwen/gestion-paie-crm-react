import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('user')).admin ? false : true;
    const operateur_paie = JSON.parse(localStorage.getItem('user')).operateur_paie;
    const operateur_donnees_paie = JSON.parse(localStorage.getItem('user')).operateur_donnees_paie;
    const operateur_cnss = JSON.parse(localStorage.getItem('user')).operateur_cnss;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className="sidebar">
            <Link to="/" className="logo"><h1>PaieTunisie</h1></Link>
            <div className="sidebar-section">
                <h2>Accueil</h2>
                <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
                <Link to="/historique" className="nav-link">Historique</Link>
                {(admin || (!admin && operateur_paie === true)) && <div className="sidebar-section">
                    <h2>Données</h2>
                    <Link to="/fiche-entreprise" className="nav-link">Fiche d'entreprise</Link>
                    <Link to="/salaries" className="nav-link">Salariés</Link>
                    <Link to="/parametres" className="nav-link">Paramètres de paie</Link>
                </div>}

                {(admin || (!admin && operateur_donnees_paie === true)) && <div className="sidebar-section">
                    <h2>Paie</h2>
                    <Link to="/calcule-de-paie" className="nav-link">Calcul de la paie</Link>
                    <Link to="/journal-de-paie" className="nav-link">Journal de la paie</Link>
                    <Link to="/virement" className="nav-link">Virements bancaires</Link>
                    <Link to="/conge" className="nav-link">Etat de congé</Link>
                </div>}

                {(admin || (!admin && operateur_cnss === true)) && <div className="sidebar-section">
                    <h2>CNSS</h2>
                    <Link to="/etat-cnss" className="nav-link">Etat CNSS</Link>
                </div>}

                <div className="sidebar-section">
                    <h2>Mon compte</h2>
                    {admin && <Link to="/identification" className="nav-link">Identification</Link>}
                    {admin && <Link to="/abonnement" className="nav-link">Abonnement</Link>}
                    {admin && <Link to="/utilisateurs" className="nav-link">Utilisateurs</Link>}
                    <Link to={"/login"} onClick={handleLogout} className="nav-link logout">Déconnexion</Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
