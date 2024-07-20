import React from 'react';
import Form from '@components/form/Form';
import Link from '@components/general/Link';
import { IoIosArrowForward } from 'react-icons/io';

const SignIn = () => {
    return (
        <Form 
            title='Sign in with your Vision ID'
            description='One Vision ID is all you need to access all cloud services.'
            inputs={[
                {
                    placeholder: 'Email Address or Username',
                    name: 'usernameOrEmail'
                },
                {
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password'
                }
            ]}
            HeaderComplement={() => (
                <div className='Form-Header-Description-Complement-Container'>
                    <p className='Form-Header-Description'>Don't have a Vision ID?</p>
                    <Link title='Create One' to='/auth/sign-up/' Icon={IoIosArrowForward} />
                </div>
            )}
        />
    );
};

export default SignIn;