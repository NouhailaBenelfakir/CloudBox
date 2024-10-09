import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import './SignUp.css'; // Make sure to link the CSS file
import Navbar from './Navbar';

// Define your user pool data
const userPoolData = {
  UserPoolId: "us-east-1_BTLu5nckG", // Replace with your Cognito User Pool ID
  ClientId: "3ta272dh1hgj19no2131u99276", // Replace with your Cognito App Client ID
};

const userPool = new CognitoUserPool(userPoolData);

const SignUp = ({ setShowConfirmation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        setMessage(`Sign up failed: ${err.message}`);
        return;
      }
      setMessage(`Sign up successful! Please check your email for a confirmation code.`);
      setIsConfirming(true);
    });
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
      if (err) {
        setMessage(`Confirmation failed: ${err.message}`);
        return;
      }
      setMessage('Confirmation successful! You can now log in.');
      setShowConfirmation(false);
    });
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className="signup-container">
      <div className="signup-box">
        <h2>{isConfirming ? 'Confirm Sign Up' : 'Sign Up'}</h2>
        {message && <p>{message}</p>}
        <form onSubmit={isConfirming ? handleConfirm : handleSignUp}>
          {!isConfirming && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          {isConfirming && (
            <input
              type="text"
              placeholder="Confirmation Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          )}
          <button type="submit">{isConfirming ? 'Confirm' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
