import React from 'react';
import DashboardHeader from '@components/dashboard/DashboardHeader';
import Entities from '@components/dashboard/Entities';
import './Dashboard.css';

const Dashboard = () => {

    return (
        <main id='Dashboard-Main'>
            <DashboardHeader />
            <article className='Dashboard-Body-Container'>
                <Entities />
            </article>
        </main>
    );
};

export default Dashboard;