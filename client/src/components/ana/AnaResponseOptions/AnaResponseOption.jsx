import React from 'react';
import { PiSpeakerHigh } from 'react-icons/pi';
import { SlLike, SlDislike } from 'react-icons/sl';
import './AnaResponseOptions.css';

const AnaResponseOptions = () => {

    return (
        <div className='Ana-Response-Options-Bottom-Container'>
            <i className='Ana-Response-Option'>
                <PiSpeakerHigh />
            </i>
            <i className='Ana-Response-Option'>
                <SlLike />
            </i>
            <i className='Ana-Response-Option'>
                <SlDislike />
            </i>
        </div>
    );
};

export default AnaResponseOptions;