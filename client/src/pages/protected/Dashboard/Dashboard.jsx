import React from 'react';
import DashboardHeader from '@components/dashboard/DashboardHeader';
import Entities from '@components/dashboard/Entities';
import { useSelector } from 'react-redux';
import './Dashboard.css';

const Dashboard = () => {
    const { selectedDashboardTab } = useSelector((state) => state.core);
    const tabs = [<Entities />];

    return (
        <main id='Dashboard-Main'>
            <DashboardHeader />
            <article className='Dashboard-Body-Container'>
                {tabs[selectedDashboardTab]}
            </article>
        </main>
    );
};

export default Dashboard;