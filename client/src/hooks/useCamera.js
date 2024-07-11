import { useRef, useEffect, useState } from 'react';

const useCamera = () => {
    const videoRef = useRef(null);
    const [cameraPermissionsDenied, setCameraPermissionDenied] = useState(false);

    const requestCameraPermission = async () => {
        try{
            const constraints = {
                video: {
                    facingMode: 'environment',
                    with: { ideal: 3840 },
                    height: { ideal: 2160 }
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if(videoRef.current) videoRef.current.srcObject = stream;
        }catch{
            setCameraPermissionDenied(true);
        }
    };

    useEffect(() => {
        requestCameraPermission();
        return () => {
            if(videoRef.current && videoRef.current.srcObject){
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return { videoRef, cameraPermissionsDenied };
};

export default useCamera;