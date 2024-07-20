import React from 'react';
import Input from '@components/form/Input';
import './FormBody.css';

const FormBody = ({ inputs, formik }) => {
    return (
        <div className='Form-Body-Container'>
            {inputs.map((props, index) => (
                <Input
                    {...props}
                    key={index}
                    id={props.name}
                    name={props.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[props.name]}
                    error={formik.touched[props.name] && formik.errors[props.name]}
                />
            ))}
        </div>
    );
};

export default FormBody;