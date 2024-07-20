import React from 'react';
import ARPoweredHumans from '@images/dashboard/ar-powered-humans.png';
import { HiArrowUpRight } from 'react-icons/hi2';
import { PiMapPinSimpleArea } from 'react-icons/pi';
import { FiEye } from 'react-icons/fi';
import { CiUnlock } from 'react-icons/ci';
import { RiDeleteBin7Line } from 'react-icons/ri';
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

            <article className='Dashboard-Body-Container'>
                <div className='Entities-Container'>
                    <div className='Entity-Container'>
                        <div className='Entity-Header-Container'>
                            <div className='Entity-Header-Top-Container'>
                                <div className='Entity-Header-Left-Container'>
                                    <i className='Entity-Header-Type-Icon-Container'>
                                        <PiMapPinSimpleArea />
                                    </i>
                                    <h3 className='Entity-Header-Name'>Vision's Hello World</h3>
                                </div>
                                <i className='Entity-Header-Arrow-Icon-Container'>
                                    <HiArrowUpRight />
                                </i>
                            </div>
                            <div className='Entity-Header-Bottom-Container'>
                                <p className='Entity-Header-Description'>A wise man named Brian Kernighan once said that every great adventure begins with a "Hello world."</p>
                            </div>
                        </div>
                        <div className='Entity-Bottom-Container'>
                            <div className='Entity-Bottom-Left-Container'>
                                {[
                                    [FiEye, '178 views'],
                                    [CiUnlock, 'Public'],
                                ].map(([ Icon, helperText ], index) => (
                                    <div className='Entity-Bottom-Row-Container' key={index}>
                                        <i className='Entity-Bottom-Row-Icon-Container'>
                                            <Icon />
                                        </i>
                                        <span className='Entity-Bottom-Row-Helper-Text'>{helperText}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='Entity-Bottom-Right-Container'>
                                <i className='Entity-Bottom-Delete-Icon-Container'>
                                    <RiDeleteBin7Line />
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Dashboard;