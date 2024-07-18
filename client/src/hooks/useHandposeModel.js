import { useEffect, useRef, useCallback } from 'react';

const DETECTION_INTERVAL = 500;
const SWIPE_THRESHOLD = 100;
const OPEN_HAND_THRESHOLD = 2500;

const useHandposeModel = () => {
    const handposeWorkerRef = useRef(null);
    const videoRef = useRef(null);
    const isModelLoadedRef = useRef(null);
    const lastDetectionTimeRef = useRef(null);
    const lastPositionRef = useRef(null);
    const isProcessingRef = useRef(null);

    const loadHandposeModel = useCallback(async () => {
        if(handposeWorkerRef.current) return;
        try{
            handposeWorkerRef.current = new Worker(new URL('/handpose-worker.js', import.meta.url));
            handposeWorkerRef.current.addEventListener('message', ({ data }) => {
                if(data.type === 'modelLoaded'){
                    isModelLoadedRef.current = true;
                }else if(data.type === 'predictions'){
                    detectGestures(data.predictions);
                    isProcessingRef.current = false;
                }
            });
        }catch(error){
            console.error('(@hooks/useHandposeModel.js): Error loading handpose model ->', error);
        }
    }, []);

    const detectSwipe = useCallback((landmarks) => {
        const currentPosition = landmarks[0];
        if(lastPositionRef.current){
            const dx = currentPosition[0] - lastPositionRef.current[0];
            if(Math.abs(dx) > SWIPE_THRESHOLD){
                console.log(dx > 0 ? 'Swipe Right' : 'Swipe Left');
            }
        }
        lastPositionRef.current = currentPosition;
    }, []);

    const isOpenHand = useCallback((landmarks) => {
        const fingertips = [4, 8, 12, 16, 20];
        const bases = [0, 5, 9, 13, 17];
        return fingertips.every((tip, i) => {
            const [dx, dy, dz] = landmarks[tip].map((coord, j) => coord - landmarks[bases[i]][j]);
            return dx * dx + dy * dy + dz * dz >= OPEN_HAND_THRESHOLD;
        });
    }, []);

    const detectGestures = useCallback((predictions) => {
        predictions.forEach(({ landmarks }) => {
            detectSwipe(landmarks);
            if(isOpenHand(landmarks)){
                console.log('Hands open!');
            }
        });
    }, [detectSwipe, isOpenHand]);

    const detectHands = useCallback(() => {
        if(!isModelLoadedRef.current || isProcessingRef.current){
            requestAnimationFrame(detectHands);
            return;
        }
        const now = Date.now();
        if(now - lastDetectionTimeRef.current < DETECTION_INTERVAL){
            requestAnimationFrame(detectHands);
            return;
        }
        lastDetectionTimeRef.current = now;
        if(!videoRef.current) videoRef.current = document.querySelector('video');
        if(videoRef.current){
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            isProcessingRef.current = true;
            handposeWorkerRef.current.postMessage({
                type: 'detect',
                pixels,
                width: canvas.width,
                height: canvas.height
            }, [pixels.data.buffer]);
        }
        requestAnimationFrame(detectHands);
    }, []);

    useEffect(() => {
        return () => {
            if(handposeWorkerRef.current) handposeWorkerRef.current.terminate();
        };
    }, []);

    return { detectHands, loadHandposeModel };
};

export default useHandposeModel;