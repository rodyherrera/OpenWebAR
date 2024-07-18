import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useHandposeModel = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

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
        };
    }, []);

    const detectGestures = () => {
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
                return;
            }
            if(socket && isConnected){
                socket.emit('image', blob);
            }else{
                console.error('Socket is not connected');
            }
        }, 'image/webp', 0.8);
    };

    return { detectGestures, isConnected };
};

export default useHandposeModel;