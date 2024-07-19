import React from 'react';
import './Button.css';

const Button = ({ value }) => {

    return (
        <button className='Button-Container'>{value}</button>
    );
};

export default Button;