import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateWithCachedToken } from '@services/authentication/utils';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated) return;
        authenticateWithCachedToken(dispatch);
    }, [isAuthenticated]);

    return (
        <Outlet />
    );
};

export default Layout;