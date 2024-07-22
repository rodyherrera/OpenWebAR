import { useState } from 'react';
import axios from 'axios';

const useFrameSender = () => {
    const [isSending, setIsSending] = useState(false);

    const takeFrameAndSend = async () => {
        if(isSending) return;
        const video = document.querySelector('video');
        if(video.paused || video.ended){
            console.error('@hooks/useFrameSender.js: video is not playing.');
            setIsSending(false);
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise((resolve) => {
            if(typeof canvas.toBlob === 'function'){
                canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.8);
                return;
            }
            const dataURL = canvas.toDataURL('image/webp', 0.8);
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for(let i = 0; i < byteString.length; i++){
                ia[i] = byteString.charCodeAt(i);
            }
            resolve(new Blob([ab], { type: mimeString }))
        });
        if(!blob){
            console.error('@hooks/useFrameSender.js: failed to create blob from canvas.');
            setIsSending(false);
            return;
        }
        const formData = new FormData();
        formData.append('file', blob, 'frame.webp');
        try{
            await axios.post(import.meta.env.VITE_SERVER, formData);
        }catch(error){
            console.error('@hooks/useFrameSender.js: error sending the frame to server:', error);
        }finally{
            setIsSending(false);
        }
    };

    return { isSending, takeFrameAndSend }
};

export default useFrameSender;