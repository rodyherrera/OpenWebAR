import React from 'react';
import FormHeader from '@components/form/FormHeader';
import FormBody from '@components/form/FormBody';
import FormFooter from '@components/form/FormFooter';
import './Form.css';

const Form = ({ title, description, HeaderComplement, inputs }) => {

    return (
        <form className='Form-Container'>
            <FormHeader title={title} description={description} HeaderComplement={HeaderComplement} />
            <FormBody inputs={inputs} />
            <FormFooter />
        </form>
    );
};

export default Form;