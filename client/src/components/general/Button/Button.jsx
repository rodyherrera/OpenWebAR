import React from 'react';
import './Button.css';

const Button = ({ value, variant = '', Icon = null }) => {

    return (
        <button className={'Button-Container '.concat(variant)}>
            <span className='Button-Value'>{value}</span>
            {Icon && (
                <i className='Button-Icon-Container'>
                    <Icon />
                </i>
            )}
        </button>
    );
};

export default Button;