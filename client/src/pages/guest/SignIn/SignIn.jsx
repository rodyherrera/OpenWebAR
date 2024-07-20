import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '@services/authentication/operations';
import { IoIosArrowForward, IoIosArrowRoundForward } from 'react-icons/io';
import Button from '@components/general/Button';
import './Sign-In.css';

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
        <form className='Form-Container'>
            <article className='Form-Header-Container'>
                <h3 className='Form-Header-Title'>Sign in with your Vision ID</h3>
                <p className='Form-Header-Description'>One Vision ID is all you need to access all cloud services.</p>
                <div className='Form-Header-Description-Complement-Container'>
                    <p className='Form-Header-Description'>Don't have a Vision ID?</p>
                    <div className='Link-Container'>
                        <a className='Link'>Create one</a>
                        <i className='Link-Icon-Container'>
                            <IoIosArrowForward />
                        </i>
                    </div>
                </div>
            </article>

            <article className='Form-Body-Container'>
                <div className='Input-Container'>
                    <input 
                        placeholder='Email Address or Username'
                        className='Input' />
                </div>

                <div className='Input-Container'>
                    <input 
                        placeholder='Password'
                        className='Input' />
                </div>
            </article>

            <article className='Form-Footer-Container'>
                <Button 
                    type='submit'
                    Icon={IoIosArrowRoundForward}
                    variant='Contained Submit-Button'
                    value='Continue' />
            </article>
        </form>
    );
};

export default SignIn;