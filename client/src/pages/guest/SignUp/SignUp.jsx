import React from 'react';
import Form from '@components/form/Form';
import Link from '@components/general/Link';
import { IoIosArrowForward } from 'react-icons/io';

const SignIn = () => {
    return (
        <Form 
            title='Create Your Vision ID'
            description='One Vision ID is all you need to access all cloud services.'
            inputs={[
                {
                    placeholder: 'Your name',
                    type: 'text',
                    name: 'fullname'
                },
                {
                    placeholder: 'Username',
                    type: 'text',
                    name: 'username'
                },
                {
                    placeholder: 'Email address',
                    type: 'email',
                    name: 'email'
                },
                {
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password'
                },
                {
                    placeholder: 'Confirm password',
                    type: 'password',
                    name: 'passwordConfirm'
                }
            ]}
            HeaderComplement={() => (
                <div className='Form-Header-Description-Complement-Container'>
                    <p className='Form-Header-Description'>Already have an Vision ID?</p>
                    <Link title='Sign In' to='/auth/sign-in/' Icon={IoIosArrowForward} />
                </div>
            )}
        />
    );
};

export default SignIn;