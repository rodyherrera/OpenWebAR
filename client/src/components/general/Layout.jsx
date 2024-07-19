import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateWithCachedToken } from '@services/authentication/utils';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated) return;
        authenticateWithCachedToken(dispatch);
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            <div className='Header-Container-Wrapper'>
                <header className='Header-Container'>
                    {['Store', 'WebAR', 'Support', 'Account', 'Open Source', 'Documentation', 'Privacy & Terms', 'Explore'].map((itemTitle, index) => (
                        <div className='Header-Item-Container' key={index}>
                            <h3 className='Header-Item-Title'>{itemTitle}</h3>
                        </div>
                    ))}
                </header>
            </div>
            <Outlet />
        </React.Fragment>
    );
};

export default Layout;