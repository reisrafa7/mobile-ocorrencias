// src/Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Detalhes da ocorrência</h2>
        <p><strong>Fluxo:</strong> Seinfra - Inscrição Minha casa</p>
        <p><strong>Atendente atual:</strong> Rafael</p>
        <div className="buttons">
          <button className="btn btn-green" onClick={onConfirm}>Sim</button>
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
