import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '@services/authentication/operations';

const SignIn = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return () => {
            setUsername('');
            setPassword('');
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn({ username, password }));
    };

    return (
        <main id='Sign-In-Main'>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Sign In</button>
            </form>
        </main>
    );
};

export default SignIn;