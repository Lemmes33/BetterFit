import React from 'react';
import './logoutconfirmation.css';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-confirmation-overlay">
      <div className="logout-confirmation-dialog">
        <h3>Are you sure you want to log out?</h3>
        <div className="logout-confirmation-buttons">
          <button onClick={onConfirm}>Yes, Log Out</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
