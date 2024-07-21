import React from 'react';
import './Input.css';

const Input = ({ containerProps, RightIcon, RightIconProps = {}, ...props }) => {

    return (
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
    );
};

export default Input;