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

const ollamaVisionHandler = async (image: string, socket: Socket) => {
    const ollama = new Ollama({
        model: process.env.OLLAMA_VISION_MODEL
    });
    await ollama.streamResponse('Describe this image', [image], (part: ChatResponse) => {
        socket.emit('ollama-vision-stream-response', part);
    });
};

const ollamaPromptHandler = async (prompt: string, socket: Socket) => {
    // TODO: fix it, "ana" must be a customizable name,
    // replace css 'Ana-*' with 'Ollama-*'
    const ollama = new Ollama({ 
        model: process.env.OLLAMA_CHAT_MODEL,
        temperature: 0.7
    });
    await ollama.streamResponse(prompt, [], (part: ChatResponse) => {
        socket.emit('ollama-stream-response', part);
    });
};

// REFACTOR THIS
const ollamaGenerateTitleHandler = async (ctx: string, socket: Socket) => {
    const ollama = new Ollama({ 
        model: process.env.OLLAMA_SUMMARIZE_MODEL,
        temperature: 0.7,
        maxTokens: 10
    });
    const ctxObj = JSON.parse(ctx);
    const parsedCtx = ctxObj.map(({ content, role }) => `(${role}: ${content})`).join(';');
    const prompt = `Create a title for the conversation. The title MUST BE EXACTLY 4 WORDS. No more, no less. Context: ${parsedCtx}`;   
    await ollama.streamResponse(prompt, [], (part: ChatResponse) => {
        socket.emit('ollama-generate-title-stream-response', part);
    });
};

const connectionHandler = (socket: Socket) => {
    console.log('@controllers/ws: client connected.');
    socket.on('image', (message: string) => imageHandler(message, socket));
    socket.on('ollama-prompt', (prompt: string) => ollamaPromptHandler(prompt, socket));
    socket.on('ollama-generate-title', (ctx: string) => ollamaGenerateTitleHandler(ctx, socket))
};

// todo: the default exported function is the 
// connection handler for the websocket.
export default (io: Server) => {
    io.on('connection', connectionHandler);
};