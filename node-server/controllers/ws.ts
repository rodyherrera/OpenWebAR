import { Socket, Server } from 'socket.io';
import { getPredictions } from '@services/handpose';

const imageHandler = async (blob: string, socket: Socket) => {
    const predictions = await getPredictions(blob);
    socket.emit('gesture', predictions);
};

const connectionHandler = (socket: Socket) => {
    console.log('@controllers/ws: client connected.');
    socket.on('image', (message: string) => imageHandler(message, socket));
};

// todo: the default exported function is the 
// connection handler for the websocket.
export default (io: Server) => {
    io.on('connection', connectionHandler);
};