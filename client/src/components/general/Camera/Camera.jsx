import React, { useRef, useEffect } from 'react';
import Prompt from '@components/general/Prompt';
import CameraHeader from '@components/general/CameraHeader';
import CameraFooter from '@components/general/CameraFooter';
import useFrameSender from '@hooks/useFrameSender';
import useParticles from '@hooks/useParticles';
import '@utilities/aframeRoundedBox';
import '@utilities/aframeRoundedImage';
import '@utilities/aframeRoundedVideo';
import './Camera.css';

const Camera = () => {
    const cameraContainerRef = useRef(null);
    const requestPermissionsRef = useRef(null);
    const { isSending, takeFrameAndSend } = useFrameSender();
    const { requestDeviceMotionPermission } = useParticles(cameraContainerRef);

    useEffect(() => {
        if(!requestPermissionsRef.current) return;
        requestPermissionsRef.current.addEventListener('click', requestDeviceMotionPermission);
    }, [requestPermissionsRef]);

    return (false) ? (
        <p>Permission denied. Please allow camera access.</p>
    ) : (
        <div className='Camera-Container' ref={cameraContainerRef}>
            <Prompt
                title='Your inmersive web experience'
                description="We need you to interactively provide us with permissions to use your device's sensors. It will only be once, your privacy will not be affected."
                buttonContainerProps={{ ref: requestDeviceMotionPermission }}
            />
            <CameraHeader />
            <a-scene 
                device-orientation-permission-ui='enabled: false' 
                arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false;' 
                renderer='antialias: true; alpha: true'
            >
                <a-camera gps-new-camera='gpsMinDistance: 5; simulateLatitude: 51.049; simulateLongitude: -0.723' />
                <a-entity light='type: ambient; color: #ffffff; intensity: 0.5' />
                <a-entity light='type: directional; color: #ffffff; intensity: 0.8" position="1 1 1' />
                <a-entity light='type: directional; color: #ffffff; intensity: 0.5" position="-1 -1 -1' />

                <a-entity 
                    look-at='[gps-new-camera]'
                    gps-new-entity-place='latitude: 51.05; longitude: -0.723'
                    scale='70 70 70'
                >
                    <a-rounded-image 
                        src='/cat-0.jpeg'
                        radius='0.1' 
                        width='2' 
                        height='1' 
                        position='-2.3 0 0' />

                    <a-rounded-box 
                        width='1.8'
                        height='.3' 
                        color='#FFFFFF' 
                        opacity='.8'
                        radius='.15' 
                        top-left-radius='.15' 
                        top-right-radius='.15'
                        bottom-left-radius='.15' 
                        bottom-right-radius='.15' 
                        shadow='cast: true; receive: true'
                        position="0 -1 0"
                    >
                        <a-text 
                            value='Exploring the future!' 
                            align='center' 
                            color='#000000'
                            width='1.8' 
                            position='0 .2 .5' 
                            rotation='0 0 0' />
                    </a-rounded-box>
            
                    <a-rounded-video
                        src='/acid-arab.mp4'
                        width='4.5'
                        height='2.5'
                        radius='0.2'
                        position='0 0 -2.5'
                        autoplay='true'
                        loop='true' />
                        
                    <a-rounded-image 
                        src='cat-1.png'
                        radius='0.1' 
                        width='2' 
                        height='1' 
                        position='2.3 0 0' />
                </a-entity>
            </a-scene>
            <CameraFooter takeFrameAndSend={takeFrameAndSend} />
        </div>
    );
};

export default Camera;