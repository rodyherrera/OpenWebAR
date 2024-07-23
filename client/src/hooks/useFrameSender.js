import { useState, useRef } from 'react';
import axios from 'axios';

const useFrameSender = () => {
    const [isSending, setIsSending] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const takeFrameAndSend = async () => {
        if(isSending) return;
        setIsSending(true);
        if(!videoRef.current){
            const video = document.querySelector('video');
            videoRef.current = video;
        }
        if(videoRef.current.paused || videoRef.current.ended){
            console.error('@hooks/useFrameSender.js: video is not playing.');
            setIsSending(false);
            return;
        }
        if(!canvasRef.current){
            const canvas = document.createElement('canvas');
            canvasRef.current = canvas;
        }
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        try{
            const blob = await new Promise((resolve) => {
                if(typeof canvasRef.current.toBlob === 'function'){
                    canvasRef.current.toBlob((blob) => resolve(blob), 'image/webp', 0.8);
                    return;
                }
                const dataURL = canvasRef.current.toDataURL('image/webp', 0.8);
                const byteString = atob(dataURL.split(',')[1]);
                const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for(let i = 0; i < byteString.length; i++){
                    ia[i] = byteString.charCodeAt(i);
                }
                resolve(new Blob([ab], { type: mimeString }))
            });
            const formData = new FormData();
            formData.append('file', blob, 'frame.webp');
            const { VITE_SERVER, VITE_API_SUFFIX } = import.meta.env;
            const endpoint = VITE_SERVER + VITE_API_SUFFIX + '/entity/find-similar/';
            await axios.post(endpoint, formData);
        }catch(error){
            console.error('@hooks/useFrameSender.js: failed to create blob from canvas.');
            console.error('@hooks/useFrameSender.js: error sending the frame to server:', error);
            setIsSending(false);
        }
    };

    return { isSending, takeFrameAndSend }
};

export default useFrameSender;