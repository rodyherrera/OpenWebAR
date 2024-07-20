import React from 'react';
import Form from '@components/form/Form';
import { IoIosArrowForward } from 'react-icons/io';
import './Sign-In.css';

const SignIn = () => {
    return (
        <Form 
            title='Sign in with your Vision ID'
            description='One Vision ID is all you need to access all cloud services.'
            inputs={[
                {
                    placeholder: 'Email Address or Username'
                },
                {
                    placeholder: 'Password',
                    type: 'password'
                }
            ]}
            HeaderComplement={() => (
                <div className='Form-Header-Description-Complement-Container'>
                    <p className='Form-Header-Description'>Don't have a Vision ID?</p>
                    <div className='Link-Container'>
                        <a className='Link'>Create one</a>
                        <i className='Link-Icon-Container'>
                            <IoIosArrowForward />
                        </i>
                    </div>
                </div>
            )}
        />
    );
};

export default SignIn;