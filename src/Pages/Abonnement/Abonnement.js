import React, { useState, useEffect } from 'react';
import './Abonnement.css';
import Navbar from "../../Components/Navbar/Navbar";

function Abonnement() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        cardExp: '',
        cardCVC: ''
    });

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "whitesmoke";
        };
    }, []);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedPlan) {
            alert('Veuillez sélectionner un plan d’abonnement avant de payer.');
            return;
        }
        alert(`Merci pour votre abonnement. Le paiement a été effectué avec succès.`);
    };

    return (
        <>
            <Navbar />
            <div className="tarif">
                <h1 className="tarif-title">Nos Tarifs</h1>
                <div className="subscription-options">
                    {['3 mois', 'un an', 'deux ans'].map((plan, index) => (
                        <div className={`option ${selectedPlan === plan ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handlePlanSelect(plan)}>
                            <h2>{plan === '3 mois' ? '11-40' : plan === 'un an' ? '41-140' : '141-500'} Salariés (Tarif global par mois)</h2>
                            <p className="price">{plan === '3 mois' ? '10 TND' : plan === 'un an' ? '20 TND' : '50 TND'}</p>
                            <p className="benefit">{plan === '3 mois' ? 'Nombre maximum de salariés: 40' : plan === 'un an' ? 'Nombre maximum de salariés: 140' : 'Nombre maximum de salariés: 500'}</p>
                            <button onClick={() => handlePlanSelect(plan)}>S'abonner</button>
                        </div>
                    ))}
                </div>
                {selectedPlan && (
                    <div className="payment-form">
                        <h2>Informations de paiement</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="cardName" placeholder="Nom sur la carte" value={cardInfo.cardName} onChange={handleInputChange} />
                            <input type="text" name="cardNumber" placeholder="Numéro de la carte" value={cardInfo.cardNumber} onChange={handleInputChange} />
                            <input type="text" name="cardExp" placeholder="Date d'expiration MM/AA" value={cardInfo.cardExp} onChange={handleInputChange} />
                            <input type="text" name="cardCVC" placeholder="CVC" value={cardInfo.cardCVC} onChange={handleInputChange} />
                            <br />
                            <button type="submit">Payer</button>
                            {!(JSON.parse(localStorage.getItem('user'))) && <p>Vous devez être inscrit pour effectuer le paiement de l'abonnement</p>}
                        </form>
                    </div>
                )}
            </div>
        </>

    );
}

export default Abonnement;
