import React, { useRef, useEffect } from 'react';
import CameraHeader from '@components/general/CameraHeader';
import CameraFooter from '@components/general/CameraFooter';
import useFrameSender from '@hooks/useFrameSender';
import useParticles from '@hooks/useParticles';
import useHandposeModel from '@hooks/useHandposeModel';
import Prompt from '@components/general/Prompt';
import CameraScene from '@components/general/CameraScene';
import './Camera.css';

const Camera = () => {
    const cameraContainerRef = useRef(null);
    const requestPermissionsRef = useRef(null);
    const { isSending, takeFrameAndSend } = useFrameSender();
    const { requestDeviceMotionPermission } = useParticles(cameraContainerRef);
    const { startDetection, isConnected } = useHandposeModel();

    useEffect(() => {
        if(!requestPermissionsRef.current) return;
        requestPermissionsRef.current.addEventListener('click', requestDeviceMotionPermission);
    }, [requestPermissionsRef]);

    useEffect(() => {
        if(!isConnected) return;
        startDetection();
    }, [isConnected]);

    return (
        <div className='Camera-Container' ref={cameraContainerRef}>
            <Prompt
                title='Your immersive web experience'
                description="We need you to interactively provide us with permissions to use your device's sensors. It will only be once, your privacy will not be affected."
                buttonContainerProps={{ ref: requestDeviceMotionPermission }}
            />
            <CameraHeader />
            {/*<CameraScene />*/}
            <CameraFooter takeFrameAndSend={takeFrameAndSend} />
        </div>
    );
};

export default Camera;
