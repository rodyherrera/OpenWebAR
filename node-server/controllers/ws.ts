import { Socket, Server } from 'socket.io';
import { ChatResponse } from 'ollama';
import HandposeDetector from '@services/handposeDetector';
import Ollama from '@services/ollama';

const initializeOllama = (modelEnvVariable: string, additionalOptions = {}) => {
    return new Ollama({
        model: process.env[modelEnvVariable],
        ...additionalOptions
    })
};

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

const ollamaHandler = async (action: 'vision' | 'prompt' | 'generate-title', data: string, socket: Socket) => {
    let prompt = '';
    let modelEnvVariable = '';
    let additionalOptions = {};
    switch(action){
        case 'vision':
            prompt = 'Describe this image';
            modelEnvVariable = 'OLLAMA_VISION_MODEL';
            break;
        case 'prompt':
            prompt = data;
            modelEnvVariable = 'OLLAMA_CHAT_MODEL';
            additionalOptions = { temperature: 0.7 };
            break;
        case 'generate-title':
            modelEnvVariable = 'OLLAMA_SUMMARIZE_MODEL';
            additionalOptions = { temperature: 0.7, maxTokens: 10 };
            const ctxObj = JSON.parse(data);
            const parsedCtx = ctxObj.map(({ content, role }) => `(${role}: ${content})`).join(';');
            prompt = `Create a title for the conversation. The title MUST BE EXACTLY 4 WORDS. No more, no less. Context: ${parsedCtx}`;
            break;
    }
    const ollama = initializeOllama(modelEnvVariable, additionalOptions);
    await ollama.streamResponse(prompt, action === 'vision' ? [data] : [], (part: ChatResponse) => {
        const eventName = action === 'vision' ? 'ollama-vision-stream-response' : action === 'prompt' ? 'ollama-stream-response' : 'ollama-generate-title-stream-response';
        socket.emit(eventName, part);
    });
};

const connectionHandler = (socket: Socket) => {
    console.log('@controllers/ws: client connected.');
    socket.on('image', (message: string) => imageHandler(message, socket));
    socket.on('ollama-prompt', (prompt: string) => ollamaHandler('prompt', prompt, socket));
    socket.on('ollama-generate-title', (ctx: string) => ollamaHandler('generateTitle', ctx, socket));
    socket.on('ollama-vision', (image: string) => ollamaHandler('vision', image, socket));
};

export default (io: Server) => {
    io.on('connection', connectionHandler);
};