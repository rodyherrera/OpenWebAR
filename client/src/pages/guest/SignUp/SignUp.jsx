import React, { useState, useEffect } from 'react';
import { signUp } from '@services/authentication/operations';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return () => {
            setUsername('');
            setEmail('');
            setPassword('');
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp({ username, email, password }));
    };

    return (
        <main id='Sign-Up-Main'>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Sign Up</button>
            </form>
        </main>
    );
};

export default SignUp;