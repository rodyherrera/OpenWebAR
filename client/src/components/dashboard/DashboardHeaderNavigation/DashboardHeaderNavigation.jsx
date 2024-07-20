import React from 'react';
import { setSelectedDashboardTab } from '@services/core/slice';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardHeaderNavigation.css';

const DashboardHeaderNavigation = () => {
    const { selectedDashboardTab } = useSelector((state) => state.core);
    const dispatch = useDispatch();

    return (
        <article className='Dashboard-Header-Navigation-Container'>
            {[
                ['Vision Entities'],
                ['My Account'],
                ['Settings'],
                ['Analytics'],
                ['Community']
            ].map(([ item ], index) => (
                <div 
                    key={index} 
                    className='Dashboard-Header-Navigation-Item-Container'
                    onClick={() => dispatch(setSelectedDashboardTab(index))}
                    data-isactive={selectedDashboardTab === index}
                >
                    <p className='Dashboard-Header-Navigation-Item-Title'>{item}</p>
                </div>
            ))}
        </article>
    );
};

export default DashboardHeaderNavigation;