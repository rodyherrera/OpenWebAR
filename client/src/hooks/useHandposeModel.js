import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

let handposeModel = null;
let lastDetectionTime = 0;
const DETECTION_INTERVAL = 300;

const useHandposeModel = () => {
    const isSupportedWebGL = () => {
        try{
            const canvas = document.createElement('canvas');
            return !!window.WebGLRenderingContext && canvas.getContext('webgl');
        }catch(e){
            return false;
        }
    };

    const loadHandposeModel = async () => {
        if(handposeModel !== null) return;
        if(isSupportedWebGL()){
            await tf.setBackend('webgl');
        }else{
            await tf.setBackend('cpu');
        }
        await tf.ready();
        handposeModel = await handpose.load();
    };

    const isOpenHand = (landmarks) => {
        const fingertips = [4, 8, 12, 16, 20];
        const bases = [0, 5, 9, 13, 17];
        for(let i = 0; i < fingertips.length; i++){
            const dx = landmarks[fingertips[i]][0] - landmarks[bases[i]][0];
            const dy = landmarks[fingertips[i]][1] - landmarks[bases[i]][1];
            const dz = landmarks[fingertips[i]][2] - landmarks[bases[i]][2];
            if(dx * dx + dy * dy + dz * dz < 2500) return false;
        }
        return true;
    };

    const detectGestures = (predictions) => {
        for(const prediction of predictions){
            const { landmarks } = prediction;
            if(isOpenHand(landmarks)){
                console.log('Hand is open!');
            }else{
                console.log('Nothing.');
            }
        }
    };

    const detectHands = async () => {
        const now = Date.now();
        if(now - lastDetectionTime < DETECTION_INTERVAL){
            requestAnimationFrame(detectHands);
            return;
        }
        lastDetectionTime = now;
        const video = document.querySelector('video');
        const predictions = await handposeModel.estimateHands(video, { flipHorizontal: true });
        if(predictions.length > 0){
            detectGestures(predictions);
        }
        requestAnimationFrame(detectHands);
    };

    return { detectHands, loadHandposeModel };
};

export default useHandposeModel;