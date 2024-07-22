import Ollama from '@services/ollama';

const moondream = new Ollama({
    model: 'moondream'
});

const prompt = 'Describe this image';
const images = ['/home/rodyherrera/ObjectDetection-AR/node-server/IMG_3795.jpeg'];
moondream.streamResponse(prompt, images, (part) => {
    console.log(part);
});