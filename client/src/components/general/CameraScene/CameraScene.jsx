import React from 'react';
import '@components/aframe/roundedBox';
import '@components/aframe/roundedImage';
import '@components/aframe/roundedVideo';
import '@components/aframe/gestures';
import '@components/aframe/draggable';
import useLocation from '@hooks/useLocation'; 
import CameraARSceneContent from '@components/general/CameraARSceneContent';

const CameraScene = () => {
    const { location, isLoading, /* isError */ } = useLocation();

    return (!isLoading) && (
        <a-scene 
            device-orientation-permission-ui='enabled: false' 
            arjs='trackingMethod: best; sourceType: webcam; videoTexture: true; debugUIEnabled: false;' 
            renderer='antialias: true; alpha: true;'
            vr-mode-ui='enabled: true' 
            cursor='rayOrigin: mouse'
            gesture-detector
            raycaster='objects: [data-clickable]'
        >
            <a-light type='ambient' color='#ffffff' intensity='1' />
            <a-light type='directional' color='#ffffff' intensity='2' position='1 1 1' />
            <a-camera
                wasd-controls='enabled: false'
                look-controls-enabled='false' 
                arjs-device-orientation-controls='smoothingFactor:0.1'
                rotation-reader
                gps-new-camera='gpsMinDistance: 5;' />
            <CameraARSceneContent location={location} />
        </a-scene>
    );
};

export default CameraScene;