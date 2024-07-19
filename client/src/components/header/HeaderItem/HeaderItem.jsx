import React from 'react';
import './HeaderItem.css';

const HeaderItem = ({ title }) => {

    return (
        <div className='Header-Item-Container'>
            <h3 className='Header-Item-Title'>{title}</h3>
        </div>
    );
};

export default HeaderItem;