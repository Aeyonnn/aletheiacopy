import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './UserPool';
import { Auth } from 'aws-amplify';

const AccountContext = createContext();

const Account = (props) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
            });
        } else {
            reject();
        }
        Auth.currentAuthenticatedUser({
            bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => console.log(user))
        .catch(err => console.log(err));
    });
};
    const authenticate = async (Username, Password) => {
     return await new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username,
            Pool,
        });

        const authDetails = new AuthenticationDetails({
            Username,
            Password,
        });
        
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("Success :", data);
                resolve(data);
            },
            onFailure: (err) => {
                console.log("Failed :", err);
                reject(err);
            },

            newPasswordRequired: (data) => {
                console.log(
                    "Password :", data
                );
                resolve(data);
            },
        });
    })   
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }
  return (
    <AccountContext.Provider value={{authenticate, getSession, logout}}>
        {props.children}
    </AccountContext.Provider>
  )
}

export { Account , AccountContext };