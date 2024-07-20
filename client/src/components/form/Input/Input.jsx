import React from 'react';
import './Input.css';

const Input = (props) => {

    return (
        <div className='Input-Container'>
            <input
                className='Input'
                {...props} />
        </div>
    );
};

export default Input;