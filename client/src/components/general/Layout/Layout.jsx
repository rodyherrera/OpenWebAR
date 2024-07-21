import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateWithCachedToken } from '@services/authentication/utils';
import { Outlet } from 'react-router-dom';
import Ana from '@components/ana/Ana';
import Header from '@components/header/Header';
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
            <Header />
            <Outlet />
            <Ana />
        </React.Fragment>
    );
};

export default Layout;