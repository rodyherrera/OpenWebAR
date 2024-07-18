import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

const CAPTURE_INTERVAL = 500;

const useHandposeModel = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const lastCaptureTimeRef = useRef(0);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        const wSocket = io('wss://8080--main--trinity--rodyherrera--c3cp3puaetl6s.pit-1.try.coder.app', {
            transports: ['websocket'],
            reconnectionDelayMax: 10000
        });

        wSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Socket connected');
        });

        wSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Socket disconnected');
        });

        setSocket(wSocket);

        return () => {
            wSocket.disconnect();
            if(animationFrameIdRef.current){
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    const captureAndSendFrame = useCallback((currentTime) => {
        if(currentTime - lastCaptureTimeRef.current >= CAPTURE_INTERVAL){
            const video = document.querySelector('video');
            if(video && video.readyState === video.HAVE_ENOUGH_DATA){
                const canvas = document.createElement('canvas');
                const scale = 0.5;
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if(blob && socket && isConnected){
                        socket.emit('image', blob);
                    }
                }, 'image/webp', 0.8);

                lastCaptureTimeRef.current = currentTime;
            }
        }
        animationFrameIdRef.current = requestAnimationFrame(captureAndSendFrame);
    }, [socket, isConnected]);

    const startDetection = useCallback(() => {
        if(!animationFrameIdRef.current){
            animationFrameIdRef.current = requestAnimationFrame(captureAndSendFrame);
        }
    }, [captureAndSendFrame]);

    const stopDetection = useCallback(() => {
        if(animationFrameIdRef.current){
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    }, []);

    return { startDetection, stopDetection, isConnected };
};

export default useHandposeModel;