import { Socket, Server } from 'socket.io';
import { getPredictions, blobToTensor } from '@services/handpose';

const imageHandler = async (blob: string, socket: Socket) => {
    const tensor = await blobToTensor(blob);
    if(!tensor){
        console.log('@controllers/ws: error converting blob to tensor.');
        return;
    }
    const gesture = await getPredictions(tensor);
    console.log(gesture);
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