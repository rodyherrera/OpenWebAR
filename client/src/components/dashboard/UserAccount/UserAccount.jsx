import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PiPasswordThin } from "react-icons/pi";
import Input from '@components/form/Input';
import Button from '@components/general/Button';
import RelatedItem from '@components/form/RelatedItem';
import './UserAccount.css';

const UserAccount = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='User-Account-Container'>
            <div className='User-Account-Left-Container'>
                <div className='User-Account-Left-Header-Container'>
                    <div className='User-Account-Left-Header-Title-Container'>
                        <h3 className='User-Account-Left-Header-Title'>Manage Your Vision's ID</h3>
                        <p className='User-Account-Left-Header-Description'>Manage your information that you share with us.</p>
                    </div>
                </div>
                <div className='User-Account-Left-Fields-Container'>
                    {[
                        {
                            placeholder: 'Full name',
                            value: user.fullname,
                            helperText: 'We want to have a relationship between you, let us know your name.'
                        },
                        {
                            placeholder: 'Email Address',
                            value: user.email,
                            helperText: 'We use your email address to send you notifications of the actions you take on the platform.'
                        },
                        {
                            placeholder: 'Username',
                            value: user.username,
                            helperText: 'What would you like us to call you?'
                        }
                    ].map((props, index) => (
                        <div className='User-Account-Field-Container' key={index}>
                            <Input {...props} />
                        </div>
                    ))}
                </div>
                <div className='User-Account-Left-Bottom-Container'>
                    <Button 
                        Icon={IoIosArrowRoundForward}
                        type='submit'
                        value='Save' 
                        variant='Contained Small Mobile-Full-Width' />
                </div>
            </div>

            <div className='User-Account-Right-Container'>
                <RelatedItem 
                    title='Change Password'
                    to='/auth/account/change-password/'
                    description='Update your password and improve the security of your account in simple steps.'
                    Icon={PiPasswordThin}  />
            </div>
        </div>
    );
};

export default UserAccount;