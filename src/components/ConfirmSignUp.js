import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import './ConfirmSignUp.css'; // Link to the CSS file

const ConfirmSignUp = ({ username }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [message, setMessage] = useState('');

  const userPoolData = {
    UserPoolId: "us-east-1_BTLu5nckG",
    ClientId: "3ta272dh1hgj19no2131u99276",
  };

  const userPool = new CognitoUserPool(userPoolData);

  const handleConfirm = (e) => {
    e.preventDefault();

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        setMessage(`Confirmation failed: ${err.message}`);
        return;
      }
      setMessage('Confirmation successful! You can now log in.');
    });
  };

  return (
    <div>
        <Navbar></Navbar>
    <div className="confirm-signup-container">
      <h2>Confirm Sign Up</h2>
      {message && <p className="confirmation-message">{message}</p>}
      <form onSubmit={handleConfirm} className="confirm-signup-form">
        <input
          type="text"
          placeholder="Enter Confirmation Code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
          className="confirmation-input"
        />
        <button type="submit" className="confirm-button">Confirm</button>
      </form>
    </div>
    </div>
  );
};

export default ConfirmSignUp;
