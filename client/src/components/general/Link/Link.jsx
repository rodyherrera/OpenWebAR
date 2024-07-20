import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Link.css';

const Link = ({ title, to, Icon }) => {
    const navigate = useNavigate();

    return (
        <div className='Link-Container' onClick={() => navigate(to)}>
            <a className='Link'>{title}</a>
            {Icon && (
                <i className='Link-Icon-Container'>
                    <Icon />
                </i>
            )}
        </div>
    );
};

export default Link;