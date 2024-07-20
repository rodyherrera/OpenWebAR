import React from 'react';
import EntityHeader from '@components/dashboard/EntityHeader';
import EntityBottom from '@components/dashboard/EntityBottom';
import './Entity.css';

const Entity = ({ name, description }) => {

    return (
        <div className='Entity-Container'>
            <EntityHeader name={name} description={description} />
            <EntityBottom />
        </div>
    );
};

export default Entity;