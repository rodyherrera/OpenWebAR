import React from 'react';
import './FormBody.css';

const FormBody = ({ inputs }) => {

    return (
        <article className='Form-Body-Container'>
            {inputs.map((props, index) => (
                <div className='Input-Container' key={index}>
                    <input
                        className='Input'
                        {...props} />
                </div>
            ))}
        </article>
    );
};

export default FormBody;