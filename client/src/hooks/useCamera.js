import { useRef, useEffect, useState } from 'react';

const useCamera = () => {
    const [cameraPermissionsDenied, setCameraPermissionDenied] = useState(false);

    const requestCameraPermission = async () => {
        try{
            const video = document.querySelector('video');
            const constraints = {
                video: {
                    facingMode: 'environment',
                    with: { ideal: 3840 },
                    height: { ideal: 2160 }
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if(video) video.srcObject = stream;
        }catch{
            setCameraPermissionDenied(true);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    return { cameraPermissionsDenied };
};

export default useCamera;