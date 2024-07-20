import React from 'react';
import './FormHeader.css';

const FormHeader = ({ HeaderComplement, title, description }) => {

    return (
        <article className='Form-Header-Container'>
            <h3 className='Form-Header-Title'>{title}</h3>
            <p className='Form-Header-Description'>{description}</p>
            {HeaderComplement && <HeaderComplement />}
        </article>
    );
};

export default FormHeader;