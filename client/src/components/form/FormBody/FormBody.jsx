import React from 'react';
import Input from '@components/form/Input';
import './FormBody.css';

const FormBody = ({ inputs }) => {

    return (
        <article className='Form-Body-Container'>
            {inputs.map((props, index) => (
                <Input {...props} key={index} />
            ))}
        </article>
    );
};

export default FormBody;