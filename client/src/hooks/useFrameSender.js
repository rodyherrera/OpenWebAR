import { useState } from 'react';
import axios from 'axios';

const useFrameSender = () => {
    const [isSending, setIsSending] = useState(false);

    const takeFrameAndSend = () => {
        if(isSending) return;
        setIsSending(true);
        const canvas = document.createElement('canvas');
        const scale = 0.5;
        const video = document.querySelector('video');
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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