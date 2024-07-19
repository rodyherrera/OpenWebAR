import * as tf from '@tensorflow/tfjs-node';
import * as handpose from '@tensorflow-models/handpose';
import sharp from 'sharp';
import '@tensorflow/tfjs-backend-wasm';

const OPEN_HAND_THRESHOLD = 2500;
const SWIPE_THRESHOLD = 50;
const BASES = [0, 5, 9, 13, 17];
const FINGERTIPS = [4, 8, 12, 16, 20];
const INDEX_FINGER_TIP = 8;
let lastIndexPosition: number[] | null = null;
let handposeModel: handpose.HandPose | null = null;

const isOpenHand = (landmarks: number[][]): boolean => {
    return FINGERTIPS.every((tip, i) => {
        const [dx, dy, dz] = [0, 1, 2].map(j => landmarks[tip][j] - landmarks[BASES[i]][j]);
        return dx * dx + dy * dy + dz * dz >= OPEN_HAND_THRESHOLD;
    });
};

const detectSwipe = (landmarks: number[][]): string | null => {
    const currentIndexPosition = landmarks[INDEX_FINGER_TIP];
    if(lastIndexPosition !== null){
        const dx = currentIndexPosition[0] - lastIndexPosition[0];
        if(Math.abs(dx) > SWIPE_THRESHOLD){
            lastIndexPosition = currentIndexPosition;
            return dx > 0 ? 'Gesture::SwipeRight' : 'Gesture::SwipeLeft';
        }
    }
    lastIndexPosition = currentIndexPosition;
    return null;
};

const detectGesture = (predictions: handpose.AnnotatedPrediction[]): string[] => {
    if(predictions.length === 0) return ['Gesture::NoDetection'];
    const gestures: string[] = [];
    for(const { landmarks } of predictions) {
        const swipeGesture = detectSwipe(landmarks);
        if(swipeGesture !== null) gestures.push(swipeGesture);
        if(isOpenHand(landmarks)) gestures.push('Gesture::OpenHand');
    }
    return gestures.length ? gestures : ['Gesture::Unrecognized'];
};

export const loadModel = async (): Promise<void> => {
    console.log('@services/handpose.ts: loading model...');
    await tf.ready();
    await tf.setBackend('wasm');
    tf.enableProdMode();
    handposeModel = await handpose.load({
        maxContinuousChecks: 1,
        detectionConfidence: 0.8,
        iouThreshold: 0.3,
        scoreThreshold: 0.73
    });
};

export const getPredictions = async (tensor: tf.Tensor3D): Promise<string[] | null> => {
    if(!handposeModel){
        console.log('@services/handpose.ts: model not loaded.');
        return null;
    }
    const predictions = await handposeModel.estimateHands(tensor);
    return detectGesture(predictions);
};

export const blobToTensor = async (blob: string): Promise<tf.Tensor3D | undefined> => {
    try{
        const buffer = Buffer.from(blob, 'base64');
        const { data, info } = await sharp(buffer)
            .removeAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });
        return tf.tensor3d(new Uint8Array(data), [info.height, info.width, 3]);
    }catch(error){
        console.error('@services/handpose.ts - blobToTensor:', error);
    }
};