import React from 'react';
import Entity from '@components/dashboard/Entity';
import './Entities.css';

const Entities = () => {

    return (
        <div className='Entities-Container'>
            <Entity 
                name="Vision's Hello World" 
                description='A wise man named Brian Kernighan once said that every great adventure begins with a "Hello world."' />
        </div>
    );
};

export default Entities;