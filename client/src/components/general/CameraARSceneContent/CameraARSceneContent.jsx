import React from 'react';
import ContainedText from '@components/aframe/ContainedText';
import RoundedImage from '@components/aframe/RoundedImage';
import RoundedBox from '@components/aframe/RoundedBox';
import Text from '@components/aframe/Text';

const ARSceneContent = () => (
    <a-entity
        look-at='[gps-new-camera]'
        gps-new-entity-place='latitude: 51.05; longitude: -0.723'
        scale='35 35 35'
        raycaster='objects: .clickable'
        emitevents='true'
        cursor='fuse: false; rayOrigin: mouse;'
    >
        <a-entity position='0 0 0'>
            <RoundedBox opacity='0.3' width='4' height='2' />
            <a-circle radius='0.05' color='#FFFFFF' position='-1.73 0.8 0.04' />
            <Text width='1.5' color='#FFFFFF' position='-1.6 0.8 0.04' value='A Day in the Life' />
            <Text width='2.5' color='#FFFFFF' position='-1.79 0.6 0.04' value='Planet Earth' />
            <Text width='1.8' color='#FFFFFF' position='-1.79 0.25 0.04' value="You can't feel it, but Earth is constantly in motion. All planets spin on an invisible axis; ours makes one full turn every 24 hours, bringing days and nights to our home." />
            <Text width='1.8' color='#FFFFFF' position='-1.79 -0.2 0.04' value="When your part of the world faces the Sun, it's daytime; when it rotates away, we move into night. When you see a sunrise or sunset, you're witnessing the Earth in motion." />
        </a-entity>

        <ContainedText
            containerWidth='1'
            containerHeight='0.15'
            align='center'
            width='1.6'
            fontPosition='-1.3 -0.7 0.08'
            position='-1.3 -0.7 0.04'
            value='View globe'
        />

        <RoundedBox width='1.7' opacity='0.3' height='2' position='1.13 0 0.03' />
        <RoundedImage src='/assets/native-apps/hello-world/earth.png' width='2' height='1.8' position='1.2 0 0.06' />

        <a-entity position='0 -1.2 0'>
            <a-circle radius='0.085' color='#FFFFFF' opacity='0.3' position='-0.65 0 0' />
            <RoundedBox width='1' opacity='0.3' height='0.15' position='0 0 0' />
        </a-entity>
    </a-entity>
);

export default ARSceneContent;
