importScripts('/tensorflow.js');
importScripts('/handpose.min.js');

let model = null;

const loadModel = async () => {
    console.log('(handpose-worker.js): Loading handpose model...');
    await tf.setBackend('webgl');
    model = await handpose.load({
        maxContinuousChecks: 3,
        detectionConfidence: 0.7,
        iouThreshold: 0.2,
        scoreThreshold: 0.6
    });
    self.postMessage({ type: 'modelLoaded' });
    console.log('(handpose-worker.js): Model loaded.');
};

const resizeImageData = (imageData, newWidth, newHeight) => {
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    const newCanvas = new OffscreenCanvas(newWidth, newHeight);
    const newCtx = newCanvas.getContext('2d');
    newCtx.drawImage(canvas, 0, 0, imageData.width, imageData.height, 0, 0, newWidth, newHeight);
    return newCtx.getImageData(0, 0, newWidth, newHeight);
};

self.addEventListener('message', async ({ data }) => {
    if(!model) return;
    const newWidth = Math.round(data.pixels.width * 0.5);
    const newHeight = Math.round(data.pixels.height * 0.5);
    const resizedImage = resizeImageData(data.pixels, newWidth, newHeight);
    const predictions = await model.estimateHands(resizedImage, { flipHorizontal: true });
    self.postMessage({ type: 'predictions', predictions });
});

loadModel();