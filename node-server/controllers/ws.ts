import { Socket, Server } from 'socket.io';
import HandposeDetector from '@services/handposeDetector';

const imageHandler = async (blob: string, socket: Socket) => {
    const handposeDetector = new HandposeDetector();
    const tensor = await HandposeDetector.blobToTensor(blob);
    if(!tensor){
        console.log('@controllers/ws: error converting blob to tensor.');
        return;
    }
    const gesture = await handposeDetector.getPredictions(tensor);
    socket.emit('gesture', gesture);
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