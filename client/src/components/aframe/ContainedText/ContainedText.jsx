import React from 'react';
import RoundedBox from '@components/aframe/RoundedBox';

const ContainedText = ({
    width,
    height,
    fontPosition,
    position,
    align,
    value,
    rotation = '0 0 0',
    depth = '0',
    backgroundColor = '#FFFFFF',
    opacity = '.8',
    radius = '.15',
    color = '#333333'
}) => {
    return (
        <React.Fragment>
            <RoundedBox
                width={width}
                height={height}
                color={backgroundColor}
                opacity={opacity}
                depth={depth}
                radius={radius}
                position={position} 
                rotation={rotation} />
            <a-text 
                color={color}
                position={fontPosition}
                width={width}
                align={align}
                value={value}
                rotation={rotation} />
        </React.Fragment>
    );
};

export default ContainedText;