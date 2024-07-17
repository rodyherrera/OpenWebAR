import React from 'react';

const RoundedImage = ({
    src,
    position,
    radius = '0.1',
    width = '0.5',
    height = '0.5',
    rotation = '0 0 0'
}) => {

    return (
        <a-rounded-image
            src={src}
            radius={radius}
            width={width}
            height={height}
            position={position}
            rotation={rotation} />
    );
};

export default RoundedImage;