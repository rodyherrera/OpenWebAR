import { Socket, Server } from 'socket.io';
import { ChatResponse } from 'ollama';
import HandposeDetector from '@services/handposeDetector';
import Ollama from '@services/ollama';

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

const anaPromptHandler = async (prompt: string, socket: Socket) => {
    // fix it, "ana" must be a customizable name
    const ollama = new Ollama();
    await ollama.streamResponse(prompt, (part: ChatResponse) => {
        socket.emit('ollama-stream-response', part);
    });
    socket.emit('ollama-stream-response-end');
};

const connectionHandler = (socket: Socket) => {
    console.log('@controllers/ws: client connected.');
    socket.on('image', (message: string) => imageHandler(message, socket));
    socket.on('ollama-prompt', (prompt: string) => anaPromptHandler(prompt, socket));
};

// todo: the default exported function is the 
// connection handler for the websocket.
export default (io: Server) => {
    io.on('connection', connectionHandler);
};