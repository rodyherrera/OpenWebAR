import React from 'react';
import Entity from '@components/dashboard/Entity';
import DashboardHeader from '@components/dashboard/DashboardHeader';
import './Dashboard.css';

const Dashboard = () => {

    return (
        <main id='Dashboard-Main'>
            <DashboardHeader />
            <article className='Dashboard-Body-Container'>
                <div className='Entities-Container'>
                    <Entity 
                        name="Vision's Hello World" 
                        description='A wise man named Brian Kernighan once said that every great adventure begins with a "Hello world."' />
                </div>
            </article>
        </main>
    );
};

export default Dashboard;