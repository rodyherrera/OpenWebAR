import React from 'react';
import FormHeader from '@components/form/FormHeader';
import FormBody from '@components/form/FormBody';
import FormFooter from '@components/form/FormFooter';
import { useFormik } from 'formik';
import './Form.css';

const Form = ({ title, description, HeaderComplement, inputs }) => {
    // initialValues from inputs[n].name
    const initialValues = inputs.reduce((acc, input) => {
        acc[input.name] = '';
        return acc;
    }, {});

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <form className='Form-Container' onSubmit={formik.handleSubmit}>
            <FormHeader title={title} description={description} HeaderComplement={HeaderComplement} />
            <FormBody inputs={inputs} formik={formik} />
            <FormFooter />
        </form>
    );
};

export default Form;