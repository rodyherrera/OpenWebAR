import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        const wSocket = io(import.meta.env.VITE_SERVER, {
            transports: ['websocket'],
            reconnectionDelayMax: 10000
        });
        wSocket.on('connect', () => setIsConnected(true));
        wSocket.on('disconnect', () => setIsConnected(false));
        setSocket(wSocket);
        return () => {
            wSocket.disconnect();
        };
    }, []);

    return { socket, isConnected };
};

export default useWebSocket;