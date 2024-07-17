import React from 'react';
import '@components/aframe/roundedBox';
import '@components/aframe/roundedImage';
import '@components/aframe/roundedVideo';
import '@utilities/gestures';
import CameraARSceneContent from '@components/general/CameraARSceneContent';

const CameraScene = () => (
    <a-scene 
        device-orientation-permission-ui='enabled: false' 
        arjs='trackingMethod: best; sourceType: webcam; videoTexture: true; debugUIEnabled: false;' 
        renderer='antialias: true; alpha: true;'
        vr-mode-ui='enabled: false'
        cursor='rayOrigin: mouse'
        embedded
        gesture-detector
        raycaster='objects: [data-clickable]'
    >
        <a-camera gps-new-camera='gpsMinDistance: 5; simulateLatitude: 51.049; simulateLongitude: -0.723' />
        <CameraARSceneContent />
    </a-scene>
);

export default CameraScene;