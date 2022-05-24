import React, { useState, useContext } from 'react';
import { AccountContext } from './account';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { authenticate } = useContext(AccountContext);  

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email,password)
        .then(data => {
            console.log("Logged in!", data);
        })
        .catch(err => {
            console.error("Failed to Login", err);
        });
    };

    return (
        <div>
            <form  onSubmit={onSubmit}>
            <label htmlFor='email'>EMAIL</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <label htmlFor='password'>PASSWORD</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type='submit'>Login</button>
            </form>
        </div>
  )
}

export default Login;
