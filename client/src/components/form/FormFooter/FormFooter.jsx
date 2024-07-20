import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Button from '@components/general/Button';
import './FormFooter.css';

const FormFooter = () => {
    return (
        <div className='Form-Footer-Container'>
            <Button 
                type='submit'
                Icon={IoIosArrowRoundForward}
                variant='Contained Submit-Button'
                value='Continue' />
        </div>
    );
};

export default FormFooter;