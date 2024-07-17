import React from 'react';

const RoundedVideo = ({
    src,
    position,
    rotation = '0 0 0',
    autoplay = 'true',
    width = '1.8',
    height = '1',
    radius = '.05',
    loop = 'true'
}) => {

    return (
        <a-rounded-video
            src={src}
            position={position}
            rotation={rotation}
            autoplay={autoplay}
            width={width}
            height={height}
            radius={radius}
            loop={loop} />
    );
};

export default RoundedVideo;