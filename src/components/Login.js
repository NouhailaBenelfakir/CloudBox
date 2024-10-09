import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import './Login.css'; // Make sure to link the CSS file
import Navbar from './Navbar';

const Login = ({ setToken, setIsSigningUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);

  const userPoolData = {
    UserPoolId: "us-east-1_BTLu5nckG",
    ClientId: "3ta272dh1hgj19no2131u99276",
  };

  const userPool = new CognitoUserPool(userPoolData);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken();
        setToken(token);
        setMessage('Login successful!');
      },
      onFailure: (err) => {
        setMessage(`Login failed: ${err.message}`);
      },
      newPasswordRequired: (userAttributes, req) => {
        setShowNewPasswordInput(true);
        setMessage("Please set a new password.");
        setCognitoUser(user);
      },
    });
  };

  const handleNewPassword = (e) => {
    e.preventDefault();

    if (!cognitoUser) {
      setMessage("User is not initialized.");
      return;
    }

    cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken();
        setToken(token);
        setMessage('Password updated and login successful!');
      },
      onFailure: (err) => {
        setMessage(`Password update failed: ${err.message}`);
      },
    });
  };

  return (
    <div>
        <Navbar></Navbar>

    
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        {!showNewPasswordInput ? (
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="login-button">Login</button>
          </form>
        ) : (
          <form onSubmit={handleNewPassword}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Set New Password</button>
          </form>
        )}
        <p>
          Don't have an account?{' '}
          <button onClick={() => setIsSigningUp(true)} className="signup-button">Sign Up</button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
