import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setGesture } from '@services/core/slice';
import useWebSocket from '@hooks/useWebSocket';

const useHandposeModel = () => {
    const dispatch = useDispatch();
    const { socket, isConnected } = useWebSocket();
    const videoRef = useRef(null);
    const isProcessing = useRef(false);
    const canvasRef = useRef(null);
    const canvasCtx = useRef(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        if(isConnected) return;
        socket.on('gesture', (gesture) => {
            dispatch(setGesture(gesture));
            isProcessing.current = false;
        });
        return () => {
            if(animationFrameIdRef.current){
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isConnected]);

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