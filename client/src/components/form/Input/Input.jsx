import React from 'react';
import './Input.css';

const Input = ({ containerProps, helperText, RightIcon, RightIconProps = {}, ...props }) => {

    return (
        <div className='Form-Input-Container'>
            <div className='Input-Container' {...containerProps}>
                <input
                    className={'Input '.concat(props?.variant || '')}
                    {...props} />
                {RightIcon && (
                    <i className='Input-Icon-Container' {...RightIconProps}>
                        <RightIcon />
                    </i>
                )}
            </div>
            {helperText && (
                <div className='Input-Helper-Text-Container'>
                    <p className='Input-Helper-Text'>{helperText}</p>
                </div>
            )}
        </div>
    );
};

export default Input;