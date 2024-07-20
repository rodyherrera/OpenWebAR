import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '@components/authentication/ProtectedRoute';
import Layout from '@components/general/Layout';
import pages from '@pages';

const Application = () => {
    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }, [location.pathname])

    return (
        <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
                <Route index element={<pages.everybody.Home />} />
                <Route element={<ProtectedRoute mode='guest' />}>
                    <Route path='/auth/sign-up/' element={<pages.guest.SignUp />} />
                    <Route path='/auth/sign-in/' element={<pages.guest.SignIn />} />
                </Route>
                <Route element={<ProtectedRoute mode='protect' />}>
                    <Route path='/dashboard/' element={<pages.protected.Dashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Application;