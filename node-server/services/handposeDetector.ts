import * as tf from '@tensorflow/tfjs-node';
import * as handpose from '@tensorflow-models/handpose';
import sharp from 'sharp';
import '@tensorflow/tfjs-backend-wasm';

class HandposeDetector{
    private static readonly OPEN_HAND_THRESHOLD = 2500;
    private static readonly SWIPE_THRESHOLD = 50;
    private static readonly BASES = [0, 5, 9, 13, 17];
    private static readonly FINGERTIPS = [4, 8, 12, 16, 20];
    private static readonly INDEX_FINGER_TIP = 8;
    
    private static model: handpose.HandPose | null = null;
    private lastIndexPosition: number[] | null = null;

    private isOpenHand(landmarks: number[][]): boolean{
        return HandposeDetector.FINGERTIPS.every((tip, i) => {
            const [dx, dy, dz] = [0, 1, 2].map(j => landmarks[tip][j] - landmarks[HandposeDetector.BASES[i]][j]);
            return dx * dx + dy * dy + dz * dz >= HandposeDetector.OPEN_HAND_THRESHOLD;
        });
    };

    private detectSwipe(landmarks: number[][]): string | null {
        const currentIndexPosition = landmarks[HandposeDetector.INDEX_FINGER_TIP];
        if(this.lastIndexPosition !== null){
            const dx = currentIndexPosition[0] - this.lastIndexPosition[0];
            if(Math.abs(dx) > HandposeDetector.SWIPE_THRESHOLD){
                this.lastIndexPosition = currentIndexPosition;
                return dx > 0 ? 'Gesture::SwipeRight' : 'Gesture::SwipeLeft';
            }
        }
        this.lastIndexPosition = currentIndexPosition;
        return null;
    }

    private detectGesture(predictions: handpose.AnnotatedPrediction[]): string[]{
        if(predictions.length === 0) return ['Gesture::NoDetection'];
        const gestures: string[] = [];
        for(const { landmarks } of predictions) {
            const swipeGesture = this.detectSwipe(landmarks);
            if(swipeGesture !== null) gestures.push(swipeGesture);
            if(this.isOpenHand(landmarks)) gestures.push('Gesture::OpenHand');
        }
        return gestures.length ? gestures : ['Gesture::Unrecognized'];
    };

    static async loadModel(): Promise<void>{
        console.log('@services/handpose.ts: loading model...');
        await tf.ready();
        await tf.setBackend('wasm');
        tf.enableProdMode();
        HandposeDetector.model = await handpose.load({
            maxContinuousChecks: 1,
            detectionConfidence: 0.8,
            iouThreshold: 0.3,
            scoreThreshold: 0.73
        });
        console.log('@services/handpose.ts: model loaded successfully.');
    };

    async getPredictions(tensor: tf.Tensor3D): Promise<string[] | null>{
        if(!HandposeDetector.model){
            console.log('@services/handpose.ts: model not loaded.');
            return null;
        }
        const predictions = await HandposeDetector.model.estimateHands(tensor);
        return this.detectGesture(predictions);
    };

    static async blobToTensor(blob: string): Promise<tf.Tensor3D | undefined> {
        try{
            const buffer = Buffer.from(blob, 'base64');
            const { data, info } = await sharp(buffer)
                .removeAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });
            return tf.tensor3d(new Uint8Array(data), [info.height, info.width, 3]);
        }catch (error){
            console.error('@services/handpose.ts - blobToTensor:', error);
        }
    };
};

export default HandposeDetector;