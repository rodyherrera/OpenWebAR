import React from 'react';
import ARPoweredHumans from '@images/dashboard/ar-powered-humans.png';
import DashboardHeaderNavigation from '@components/dashboard/DashboardHeaderNavigation';
import BrandNews from '@components/general/BrandNews';
import './DashboardHeader.css';

const DashboardHeader = () => {

    return (
        <article className='Dashboard-Header-Container'>
            <div className='Dashboard-Header-Left-Container'>
                <div className='Dashboard-Header-Title-Container'>
                    <p className='Dashboard-Header-Subtitle'>👋 Welcome Rodolfo Herrera!</p>
                    <h3 className='Dashboard-Header-Title'>What can we do for you today?</h3>
                </div>

                <DashboardHeaderNavigation />
            </div>
            <div className='Dashboard-Header-Right-Container'>
                <BrandNews title='Start Creating Now' backgroundImage={ARPoweredHumans} />
            </div>
        </article>
    );
};

export default DashboardHeader;