import React from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEye } from 'react-icons/fi';
import { CiUnlock } from 'react-icons/ci';
import './EntityBottom.css';

const EntityBottom = () => {

    return (
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
    );
};

export default EntityBottom;