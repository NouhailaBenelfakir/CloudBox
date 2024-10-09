// src/AuthService.js
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { AWS_COGNITO } from './config';
import AWS from 'aws-sdk';

const userPool = new CognitoUserPool({
  UserPoolId: AWS_COGNITO.UserPoolId,
  ClientId: AWS_COGNITO.ClientId,
});


export const signUp = (email, password) => {
    const attributeList = [];

    const dataEmail = {
        Name: 'email',
        Value: email,
    };

    const attributeEmail = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


export const signIn = (email, password) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result.getAccessToken().getJwtToken());
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
