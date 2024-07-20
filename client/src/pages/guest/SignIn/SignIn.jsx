import React from 'react';
import Form from '@components/form/Form';
import Link from '@components/general/Link';
import { IoIosArrowForward } from 'react-icons/io';
import { signIn } from '@services/authentication/operations';
import { useSelector, useDispatch } from 'react-redux';

const SignIn = () => {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(signIn(values));
    };

    return (
        <Form 
            title='Sign in with your Vision ID'
            description='One Vision ID is all you need to access all cloud services.'
            isLoading={isLoading}
            onSubmit={onSubmit}
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