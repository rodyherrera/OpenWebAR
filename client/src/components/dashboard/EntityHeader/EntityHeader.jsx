import React from 'react';
import { PiMapPinSimpleArea } from 'react-icons/pi';
import { HiArrowUpRight } from 'react-icons/hi2';
import './EntityHeader.css';

const EntityHeader = ({ description, name }) => {

    return (
        <div className='Entity-Header-Container'>
            <div className='Entity-Header-Top-Container'>
                <div className='Entity-Header-Left-Container'>
                    <i className='Entity-Header-Type-Icon-Container'>
                        <PiMapPinSimpleArea />
                    </i>
                    <h3 className='Entity-Header-Name'>{name}</h3>
                </div>
                <i className='Entity-Header-Arrow-Icon-Container'>
                    <HiArrowUpRight />
                </i>
            </div>
            <div className='Entity-Header-Bottom-Container'>
                <p className='Entity-Header-Description'>{description}</p>
            </div>
        </div>
    );
};

export default EntityHeader;