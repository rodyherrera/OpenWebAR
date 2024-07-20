import React from 'react';
import './DashboardHeaderNavigation.css';

const DashboardHeaderNavigation = () => {

    return (
        <article className='Dashboard-Header-Navigation-Container'>
            {[
                ['Vision Entities', true],
                ['My Account'],
                ['Settings'],
                ['Analytics'],
                ['Community']
            ].map(([ item, isActive ]) => (
                <div className='Dashboard-Header-Navigation-Item-Container' data-isactive={isActive}>
                    <p className='Dashboard-Header-Navigation-Item-Title'>{item}</p>
                </div>
            ))}
        </article>
    );
};

export default DashboardHeaderNavigation;