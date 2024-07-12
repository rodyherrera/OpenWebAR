import { useState } from 'react';
import axios from 'axios';

const useFrameSender = (videoRef) => {
    const [isSending, setIsSending] = useState(false);

    const takeFrameAndSend = () => {
        if(isSending || !videoRef.current) return;
        setIsSending(true);
        const canvas = document.createElement('canvas');
        const scale = 0.5;
        canvas.width = videoRef.current.videoWidth * scale;
        canvas.height = videoRef.current.videoHeight * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            if(!blob){
                console.error('Failed to create blob from canvas');
                setIsSending(false);
                return;
            }
            const formData = new FormData();
            formData.append('file', blob, 'frame.webp');
            try{
                await axios.post('https://5000--main--objectdetection-ar--rodyherrera--c3cp3puaetl6s.pit-1.try.coder.app/api/v1/compare/', formData);
            }catch(error){
                console.error('Error sending the frame:', error);
            }finally{
                setIsSending(false);
            }
        }, 'image/webp', 0.8);
    };

    return { isSending, takeFrameAndSend }
};

export default useFrameSender;