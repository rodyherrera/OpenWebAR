import React from 'react';
import RoundedBox from '@components/aframe/RoundedBox';
import Text from '@components/aframe/Text';

const ContainedText = ({
    width,
    containerWidth,
    containerHeight,
    fontPosition,
    position,
    align,
    value,
    rotation = '0 0 0',
    depth = '0',
    backgroundColor = '#FFFFFF',
    opacity = '.8',
    radius = '.15',
    color = '#333333',
    containerProps,
    textProps
}) => {
    return (
        <React.Fragment>
            <RoundedBox
                width={containerWidth}
                height={containerHeight}
                color={backgroundColor}
                opacity={opacity}
                depth={depth}
                radius={radius}
                position={position} 
                rotation={rotation}
                {...containerProps} />
            <Text 
                color={color}
                position={fontPosition}
                width={width}
                align={align}
                value={value}
                rotation={rotation}
                {...textProps} />
        </React.Fragment>
    );
};

export default ContainedText;