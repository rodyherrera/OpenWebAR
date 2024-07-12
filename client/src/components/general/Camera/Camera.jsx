import React, { useRef, useEffect } from 'react';
import Prompt from '@components/general/Prompt';
import CameraHeader from '@components/general/CameraHeader';
import CameraFooter from '@components/general/CameraFooter';
import useCamera from '@hooks/useCamera';
import useFrameSender from '@hooks/useFrameSender';
import useParticles from '@hooks/useParticles';
import './Camera.css';

const Camera = () => {
    const cameraContainerRef = useRef(null);
    const { videoRef, cameraPermissionDenied } = useCamera();
    const { isSending, takeFrameAndSend } = useFrameSender(videoRef);
    const { requestDeviceMotionPermission } = useParticles(cameraContainerRef);

    useEffect(() => {
        const requestPermissionsBtn = document.getElementById('requestPermissionsBtn');
        requestPermissionsBtn.addEventListener('click', requestDeviceMotionPermission);
        return () => {
            if(videoRef.current && videoRef.current.srcObject){
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (cameraPermissionDenied) ? (
        <p>Permission denied. Please allow camera access.</p>
    ) : (
        <div className='Camera-Container' ref={cameraContainerRef}>
            <Prompt
                title='Your inmersive web experience'
                description="We need you to interactively provide us with permissions to use your device's sensors. It will only be once, your privacy will not be affected."
                buttonContainerProps={{ id: 'requestPermissionsBtn' }}
            />
            <CameraHeader />
            <video className='Camera-Video' ref={videoRef} autoPlay playsInline muted />
            <CameraFooter takeFrameAndSend={takeFrameAndSend} />
        </div>
    );
};

export default Camera;