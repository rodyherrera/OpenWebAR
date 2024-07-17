import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

let handposeModel = null;

const useHandposeModel = () => {
    const loadHandposeModel = async () => {
        if(handposeModel != null) return;
        handposeModel = await handpose.load();
    };

    const isOpenHand = (landmarks) => {
        const fingertips = [4, 8, 12, 16, 20];
        const bases = [0, 5, 9, 13, 17];
        for(let i = 0; i < fingertips.length; i++){
            const [tipX, tipY, tipZ] = landmarks[fingertips[i]];
            const [baseX, baseY, baseZ] = landmarks[bases[i]];
            if(Math.hypot(tipX - baseX, tipY - baseY, tipZ - baseZ) < 50) return false;
        }
        return true;
    };

    const detectGestures = (predictions) => {
        for(let i = 0; i < predictions.length; i++){
            const landmarks = predictions[i].landmarks;
            if(isOpenHand(landmarks)){
                console.log('HAND IS OPEN');
            }else{
                console.log('NOTHING')
            }
        }
    };

    const detectHands = async () => {
        const video = document.querySelector('video');
        const predictions = await handposeModel.estimateHands(video);
        if(predictions.length > 0){
            detectGestures(predictions);
        }
        requestAnimationFrame(detectHands);
    };
    
    return { detectHands, loadHandposeModel };
};

export default useHandposeModel;