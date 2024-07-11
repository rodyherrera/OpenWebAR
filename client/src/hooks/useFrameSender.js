import { useState } from 'react';
import axios from 'axios';

const useFrameSender = (videoRef) => {
    const [isSending, setIsSending] = useState(false);

    const takeFrameAndSend = () => {
        if(isSending || !videoRef.current) return;
        setIsSending(true);
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeigth;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');
            try{
                await axios.post('https://bar.rodyherrera.com/compare/', formData);
            }finally{
                setIsSending(false);
            }
        });
    };
    
    return { isSending, takeFrameAndSend };
};

export default useFrameSender;