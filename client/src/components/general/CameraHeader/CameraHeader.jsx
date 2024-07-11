import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import './CameraHeader.css';

const CameraHeader = () => {
    return (
        <div className='Camera-Header-Container'>
            <div className='Camera-Header-Left-Container'>
                <i className='Camera-Header-Back-Icon-Container'>
                    <FaArrowLeftLong className='Camera-Header-Back-Icon' />
                </i>
            </div>
            <div className='Camera-Header-Title-Container'>
                <h1 className='Camera-Header-Title'>Look around</h1>
                <p className='Camera-Header-Subtitle'>What Pandora's box do we open today?</p>
            </div>
            <div></div>
        </div>
    );
};

export default CameraHeader;