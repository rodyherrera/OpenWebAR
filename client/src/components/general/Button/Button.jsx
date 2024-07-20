import React from 'react';
import Loader from '@components/general/Loader';
import './Button.css';

const Button = ({ value, variant = '', Icon = null, isLoading = false }) => {

    return (
        <button className={'Button-Container '.concat(variant)} data-isloading={isLoading}>
            <span className='Button-Value'>{value}</span>
            {Icon && (
                <i className='Button-Icon-Container'>
                    <Icon />
                </i>
            )}
            {isLoading && <Loader scale='0.5' />}
        </button>
    );
};

export default Button;