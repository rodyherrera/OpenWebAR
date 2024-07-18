import { Socket, Server } from 'socket.io';
import { blobToTensor, getPredictions } from '@services/handpose';

const imageHandler = async (blob: String, socket: Socket) => {
    const tensor = await blobToTensor(blob);
    if(!tensor){
        console.log('@controllers/ws - imageHandler: error converting blob to tensor.');
        return;
    }
    const predictions = await getPredictions(tensor);
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