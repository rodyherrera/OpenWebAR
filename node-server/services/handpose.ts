import tf from '@tensorflow/tfjs-node';
import handpose, { AnnotatedPrediction, HandPose } from '@tensorflow-models/handpose';
import { Coords3D } from '@tensorflow-models/handpose/dist/pipeline';
import sharp from 'sharp';

const OPEN_HAND_THRESHOLD = 2500;
const FINGERTIPS = [4, 8, 12, 16, 20];
const BASES = [0, 5, 9, 13, 17];

let handposeModel: null | HandPose = null;

export const loadModel = async (): Promise<void> => {
    console.log('@services/handpose.ts: loading tf model.');
    tf.setBackend(process.env.TF_BACKEND || 'cpu');
    handposeModel = await handpose.load();
    console.log('@services/handpose.ts: tf model loaded.');
};

export const blobToTensor = async (blob: String): Promise<tf.Tensor3D | null> => {
    try{
        console.log('@services/handpose.ts: blob to tensor...');
        const buffer = Buffer.from(blob, 'base64');
        const image = await sharp(buffer)
            .removeAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });
        const tensor = tf.tensor3d(new Uint8Array(image.data), [image.info.height, image.info.width, 3]);
        return tensor;
    }catch(error){
        console.log('@services/handpose.ts - blobToTensor:', error);
        return null;
    }
};

const isOpenHand = (landmarks: Coords3D): boolean => {
    for(let i = 0; i < FINGERTIPS.length; i++){
        const [dx, dy, dz] = [0, 1, 2].map(j => landmarks[FINGERTIPS[i]][j] - landmarks[BASES[i]][j]);
        if(dx * dx + dy * dy + dz * dz < OPEN_HAND_THRESHOLD) return false;
    }
    return true;
};

const detectGestures = (predictions: AnnotatedPrediction[]) => {
    if(predictions.length <= 0){
        return { gesture: 'Handpose::NoDetection' };
    }
    for(const { landmarks } of predictions){
        if(isOpenHand(landmarks)) console.log('Hands open!');
    }
};

export const getPredictions = async (tensor: tf.Tensor3D) => {
    if(!handposeModel){
        console.log('@services/handpose.ts - getPredictions: model not loaded.');
        return null;
    }
    console.log('@services/handpose.ts - predicting...');
    const predictions = await handposeModel.estimateHands(tensor);
    console.log('@services/handpose.ts - ok.');
    const gesture = detectGestures(predictions);
    return gesture;
};