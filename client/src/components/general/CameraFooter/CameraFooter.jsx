import React from 'react';
import './CameraFooter.css';

const CameraFooter = ({ takeFrameAndSend }) => {
    return (
        <div className='Camera-Footer-Container'>
            <div className='Camera-Footer-Left-Container'>
            </div>
            <div className='Camera-Footer-Center-Container'>
                <div className='Camera-Trigger-Container' onClick={takeFrameAndSend}>
                    <div className='Camera-Trigger-Button' />
                </div>
            </div>
            <div className='Camera-Footer-Right-Container'>
            </div>
        </div>
    );
};

export default CameraFooter;