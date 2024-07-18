const { parentPort } = require('worker_threads');
const tf = require('@tensorflow/tfjs-node');
const handpose = require('@tensorflow-models/handpose');
const sharp = require('sharp');

const OPEN_HAND_THRESHOLD = 2500;
const FINGERTIPS = [4, 8, 12, 16, 20];
const BASES = [0, 5, 9, 13, 17];

let handposeModel = null;
let tensorPool = [];

const loadModel = async () => {
    console.log('@services/handposeWorker.cjs: loading tf model...');
    await tf.ready();
    await tf.setBackend('cpu');
    handposeModel = await handpose.load();
    console.log('@services/handposeWorker.cjs: tf model loaded.');
};

const isOpenHand = (landmarks) => {
    for(let i = 0; i < FINGERTIPS.length; i++){
        const [dx, dy, dz] = [0, 1, 2].map(j => landmarks[FINGERTIPS[i]][j] - landmarks[BASES[i]][j]);
        if(dx * dx + dy * dy + dz * dz < OPEN_HAND_THRESHOLD) return false;
    }
    return true;
};

const getPredictions = async (tensor) => {
    if(!handposeModel){
        console.error('@services/handposeWorker.jcs - getPredictions: model not loaded.');
        return null;
    }
    console.log('@services/handposeWorker.cjs: handposeModel.estimateHands(...)...');
    const predictions = await handposeModel.estimateHands(tensor);
    console.log('@services/handposeWorker.cjs: handposeModel.estimateHands(...) ok, looking for gestures...');
    const gesture = detectGestures(predictions);
    console.log('@services/handposeWorker.cjs: detectGestures(...):', gesture);
    tensorPool.push(tensor);
    return gesture;
};

const detectGestures = (predictions) => {
    if(predictions.length === 0) return { gesture: 'Handpose::NoDetection' };
    for(const { landmarks } of predictions){
        if(isOpenHand(landmarks)) return { gesture: 'Handpose::HandsOpen' };
    }
    return { gesture: 'Handspose::Unrecognized' };
};

const blobToTensor = async (blob) => {
    try {
        const buffer = Buffer.from(blob, 'base64');
        const { data, info } = await sharp(buffer)
            .removeAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });
        const tensor = tf.tensor3d(new Uint8Array(data), [info.height, info.width, 3]);
        if(tensorPool.length > 0){
            tensorPool.forEach(t => t.dispose());
            tensorPool = [];
        }
        return tensor;
    }catch (error){
        console.log('@services/handposeWorker.cjs - blobToTensor:', error);
    }
};

loadModel().then(() => {
    parentPort?.postMessage('modelLoaded');
});

parentPort?.on('message', async (message) => {
    if(message.type === 'predict'){
        const tensor = await blobToTensor(message.blob);
        if(tensor){
            const result = await getPredictions(tensor);
            parentPort?.postMessage({ type: 'result', data: result });
        }else{
            parentPort?.postMessage({ type: 'error', message: 'Failed to convert blob to tensor' });
        }
    }
});