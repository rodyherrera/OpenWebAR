import React, { useEffect, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { gsap, Power3 } from 'gsap';
import './Prompt.css';

const Prompt = ({ 
    title, 
    description, 
    buttonText = 'Continue', 
    CloseIcon = CgClose,
    buttonContainerProps = {},
    ...props
}) => {
    const [isActive, setIsActive] = useState(true);
    const promptRef = useRef(null);

    useEffect(() => {
        if(promptRef.current){
            gsap.fromTo(promptRef.current, 
                { opacity: 0, scale: 0.8, y: -50 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: Power3.easeOut }
            );
        }
        return () => {
            setIsActive(true);
        };
    }, []);

    const hidePrompt = () => {
        if(!promptRef.current) return;
        gsap.to(promptRef.current, {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.6,
            ease: Power3.easeIn,
            onComplete: () => {
                setIsActive(false);
            }
        });
    };

    return isActive && (
        <div className='Prompt-Container' {...props} data-isactive={isActive} ref={promptRef}>
            <div className='Prompt-Header-Title-Container'>
                <i className='Prompt-Header-Icon-Container' onClick={hidePrompt}>
                    <CloseIcon />
                </i>
                <h3 className='Prompt-Header-Title'>{title}</h3>
                <p className='Prompt-Header-Description'>{description}</p>
            </div>
            <div className='Prompt-Footer-Container'>
                <div className='Prompt-Option-Container' {...buttonContainerProps} onClick={hidePrompt}>
                    <p className='Prompt-Option-Text'>{buttonText}</p>
                </div>
            </div>
        </div>
    );
};

export default Prompt;