import React from 'react';

const RoundedBox = ({
    width,
    height,
    position,
    color = '#FFFFFF',
    opacity = '.8',
    radius = '.15',
    rotation = '0 0 0',
    depth='0',
    ...props
}) => {

    return (
        <a-rounded-box
            width={width}
            height={height}
            color={color}
            opacity={opacity}
            radius={radius}
            position={position}
            rotation={rotation}
            depth={depth}
            {...props} />
    );
};

export default RoundedBox;