import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

const useHandposeModel = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [gesture, setGesture] = useState({});
    const videoRef = useRef(null);
    const isProcessing = useRef(false);
    const canvasRef = useRef(null);
    const canvasCtx = useRef(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        const wSocket = io('wss://8080--main--trinity--rodyherrera--c3cp3puaetl6s.pit-1.try.coder.app', {
            transports: ['websocket'],
            reconnectionDelayMax: 10000
        });

        wSocket.on('connect', () => {
            console.log('@hooks/useHandposeModel: ws connected.');
            setIsConnected(true);
        });

        wSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('@hooks/useHandposeModel: ws disconnected.');
        });

        wSocket.on('gesture', (data) => {
            setGesture(data);
            isProcessing.current = false;
        });
        setSocket(wSocket);
        return () => {
            wSocket.disconnect();
            if(animationFrameIdRef.current){
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, []);

    const captureAndSendFrame = useCallback(() => {
        if(!isConnected || isProcessing.current){
            animationFrameIdRef.current = requestAnimationFrame(captureAndSendFrame);
            return;
        }
        if(!videoRef.current) videoRef.current = document.querySelector('video');
        if(!canvasRef.current) canvasRef.current = document.createElement('canvas');
        // Check if the video is ready
        if(videoRef.current.readyState !== 4){
            animationFrameIdRef.current = requestAnimationFrame(captureAndSendFrame);
            return;
        }
        isProcessing.current = true;
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        if(!canvasCtx.current) canvasCtx.current = canvasRef.current.getContext('2d');
        canvasCtx.current.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.toBlob((blob) => {
            socket.emit('image', blob);
            animationFrameIdRef.current = requestAnimationFrame(captureAndSendFrame);
        }, 'image/webp', 0.7);
    }, [socket, isConnected, isProcessing]);

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