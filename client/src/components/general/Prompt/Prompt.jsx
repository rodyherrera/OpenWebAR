import React from 'react';
import { CgClose } from 'react-icons/cg';
import './Prompt.css';

const Prompt = ({ 
    title, 
    description, 
    buttonText = 'Continue', 
    CloseIcon = CgClose,
    buttonContainerProps = {},
    ...props
}) => {
    return (
        <div className='Prompt-Container' {...props}>
            <div className='Prompt-Header-Title-Container'>
                <i className='Prompt-Header-Icon-Container'>
                    <CloseIcon />
                </i>
                <h3 className='Prompt-Header-Title'>{title}</h3>
                <p className='Prompt-Header-Description'>{description}</p>
            </div>
            <div className='Prompt-Footer-Container'>
                <div className='Prompt-Option-Container' {...buttonContainerProps}>
                    <p className='Prompt-Option-Text'>{buttonText}</p>
                </div>
            </div>
        </div>
    );
};

export default Prompt;