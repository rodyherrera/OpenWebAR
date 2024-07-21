import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PiPasswordThin } from "react-icons/pi";
import { updateMyProfile } from '@services/authentication/operations';
import Input from '@components/form/Input';
import Button from '@components/general/Button';
import RelatedItem from '@components/form/RelatedItem';
import Loader from '@components/general/Loader';
import './UserAccount.css';

const UserAccount = () => {
    const dispatch = useDispatch();
    const { user, isOperationLoading } = useSelector((state) => state.auth);
    const formik = useFormik({
        initialValues: {
            fullname: user.fullname,
            email: user.email,
            username: user.username
        },
        onSubmit(values){
            dispatch(updateMyProfile(values));
        }
    });

    const fields = [
        {
            name: 'fullname',
            placeholder: 'Full name',
            helperText: 'We want to have a relationship between you, let us know your name.'
        },
        {
            name: 'email',
            placeholder: 'Email Address',
            helperText: 'We use your email address to send you notifications of the actions you take on the platform.'
        },
        {
            name: 'username',
            placeholder: 'Username',
            helperText: 'What would you like us to call you?'
        }
    ];

    return (
        <form onSubmit={formik.handleSubmit} className='User-Account-Container'>
            <div className='User-Account-Left-Container'>
                <div className='User-Account-Left-Header-Container'>
                    <div className='User-Account-Left-Header-Title-Container'>
                        <h3 className='User-Account-Left-Header-Title'>Manage Your Vision's ID</h3>
                        <p className='User-Account-Left-Header-Description'>Manage your information that you share with us.</p>
                    </div>
                </div>
                <div className='User-Account-Left-Fields-Container'>
                    {fields.map((field, index) => (
                        <div className='User-Account-Field-Container' key={index}>
                            <Input {...field} value={formik.values[field.name]} onChange={formik.handleChange}  />
                        </div>
                    ))}
                </div>
                <div className='User-Account-Left-Bottom-Container'>
                    {isOperationLoading ? (
                        <div className='User-Account-Loading-Container'>
                            <Loader scale='0.6' />
                        </div>
                    ) : (
                        <Button 
                            Icon={IoIosArrowRoundForward}
                            type='submit'
                            value='Save' 
                            variant='Contained Small Mobile-Full-Width' />
                    )}
                </div>
            </div>

            <div className='User-Account-Right-Container'>
                <RelatedItem 
                    title='Change Password'
                    to='/auth/account/change-password/'
                    description='Update your password and improve the security of your account in simple steps.'
                    Icon={PiPasswordThin}  
                />
            </div>
        </form>
    );
};

export default UserAccount;