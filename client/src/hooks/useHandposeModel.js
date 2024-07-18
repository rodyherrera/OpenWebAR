import { useRef, useCallback } from 'react';

const DETECTION_INTERVAL = 500;
const SWIPE_THRESHOLD = 100;
const OPEN_HAND_THRESHOLD = 2500;
const FINGERTIPS = [4, 8, 12, 16, 20];
const BASES = [0, 5, 9, 13, 17];

const useHandposeModel = () => {
    const refs = useRef({
        worker: null,
        video: null,
        isModelLoaded: false,
        lastDetectionTime: 0,
        lastPosition: null,
        isProcessing: false,
        canvas: null,
        ctx: null
    }).current;

    const loadHandposeModel = useCallback(() => {
        if(refs.worker) return;
        try{
            refs.worker = new Worker(new URL('/handpose-worker.js', import.meta.url));
            refs.worker.onmessage = ({ data }) => {
                if(data.type === 'modelLoaded'){
                    refs.isModelLoaded = true;
                }else if(data.type === 'predictions'){
                    detectGestures(data.predictions);
                    refs.isProcessing = false;
                }
            };
        }catch(error){
            console.error('(@hooks/useHandposeModel.js): Error loading handpose model ->', error);
        }
    }, []);

    const detectSwipe = useCallback((landmarks) => {
        const currentPosition = landmarks[0];
        if(refs.lastPosition){
            const dx = currentPosition[0] - refs.lastPosition[0];
            if(Math.abs(dx) > SWIPE_THRESHOLD){
                console.log(dx > 0 ? 'Swipe Right' : 'Swipe Left');
            }
        }
        refs.lastPosition = currentPosition;
    }, []);

    const isOpenHand = useCallback((landmarks) => {
        for(let i = 0; i < FINGERTIPS.length; i++){
            const [dx, dy, dz] = [0, 1, 2].map(j => landmarks[FINGERTIPS[i]][j] - landmarks[BASES[i]][j]);
            if(dx * dx + dy * dy + dz * dz < OPEN_HAND_THRESHOLD) return false;
        }
        return true;
    }, []);

    const detectGestures = useCallback((predictions) => {
        for(const { landmarks } of predictions){
            detectSwipe(landmarks);
            if(isOpenHand(landmarks)) console.log('Hands open!');
        }
    }, [detectSwipe, isOpenHand]);

    const detectHands = useCallback(() => {
        if(!refs.isModelLoaded || refs.isProcessing || Date.now() - refs.lastDetectionTime < DETECTION_INTERVAL){
            requestAnimationFrame(detectHands);
            return;
        }
        refs.lastDetectionTime = Date.now();
        if(!refs.video) refs.video = document.querySelector('video');
        if(refs.video){
            if(!refs.canvas){
                refs.canvas = document.createElement('canvas');
                refs.ctx = refs.canvas.getContext('2d');
            }
            refs.canvas.width = refs.video.videoWidth;
            refs.canvas.height = refs.video.videoHeight;
            refs.ctx.drawImage(refs.video, 0, 0, refs.canvas.width, refs.canvas.height);
            const pixels = refs.ctx.getImageData(0, 0, refs.canvas.width, refs.canvas.height);
            refs.isProcessing = true;
            refs.worker.postMessage({
                type: 'detect',
                pixels,
                width: refs.canvas.width,
                height: refs.canvas.height
            }, [pixels.data.buffer]);
        }
        requestAnimationFrame(detectHands);
    }, []);

    return { detectHands, loadHandposeModel };
};

export default useHandposeModel;