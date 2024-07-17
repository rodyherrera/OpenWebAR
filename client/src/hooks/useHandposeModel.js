import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

let handposeModel = null;

const useHandposeModel = () => {
    const loadHandposeModel = async () => {
        if(handposeModel != null) return;
        handposeModel = await handpose.load();
    };

    const detectHands = async () => {
        const video = document.querySelector('video');
        const predictions = await handposeModel.estimateHands(video);
        if(predictions.length > 0){
            console.log(predictions);
        }
        requestAnimationFrame(detectHands);
    };
    
    return { detectHands, loadHandposeModel };
};

export default useHandposeModel;