import React from 'react';
import "../CalculePaieForm.css";

const FicheModal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default FicheModal;
