import React from 'react';
import ARPoweredHumans from '@images/dashboard/ar-powered-humans.png';
import { HiArrowUpRight } from 'react-icons/hi2';
import './Dashboard.css';

const Dashboard = () => {

    return (
        <main id='Dashboard-Main'>
            <article className='Dashboard-Header-Container'>
                <div className='Dashboard-Header-Left-Container'>
                    <div className='Dashboard-Header-Title-Container'>
                        <p className='Dashboard-Header-Subtitle'>👋 Welcome Rodolfo Herrera!</p>
                        <h3 className='Dashboard-Header-Title'>What can we do for you today?</h3>
                    </div>

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
                </div>
                <div className='Dashboard-Header-Right-Container'>
                    <figure className='Brand-News-Container'>
                        <img 
                            className='Brand-News-Image'
                            src={ARPoweredHumans} 
                            alt='Augmented Reality Powered Humans' />
                        <figcaption className='Brand-News-Caption-Container'>
                            <h3 className='Brand-News-Caption-Title'>Start Creating Now</h3>
                            <i className='Brand-News-Caption-Icon-Container'>
                                <HiArrowUpRight />
                            </i>
                        </figcaption>
                    </figure>
                </div>
            </article>
        </main>
    );
};

export default Dashboard;