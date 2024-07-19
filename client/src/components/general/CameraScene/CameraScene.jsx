import React from 'react';
import '@components/aframe/roundedBox';
import '@components/aframe/roundedImage';
import '@components/aframe/roundedVideo';
import '@components/aframe/gestures';
import '@components/aframe/draggable';
import CameraARSceneContent from '@components/general/CameraARSceneContent';

const CameraScene = () => {
    return (
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
                gps-new-camera='gpsMinDistance: 5; simulateLatitude: 51.049; simulateLongitude: -0.723' />
            <CameraARSceneContent />
        </a-scene>
    );
};

export default CameraScene;