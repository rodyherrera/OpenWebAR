import React from 'react';

const Text = ({
    value,
    position,
    rotation,
    width = '2',
    color = '#333333',
    align = undefined,
    ...props
}) => {

    return (
        <a-text 
            align={align} 
            rotation={rotation} 
            color={color} 
            width={width} 
            value={value} 
            position={position} 
            {...props} />
    );
};

export default Text;