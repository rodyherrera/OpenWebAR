importScripts('/tensorflow.js');
importScripts('/handpose.min.js');

let model = null;

(async () => {
    console.log('(handpose-worker.js): Loading handpose model...');
    model = await handpose.load();
    self.postMessage({ type: 'modelLoaded' });
    console.log('(handpose-worker.js): Model loaded.');
})();

self.addEventListener('message', async ({ data }) => {
    const predictions = await model.estimateHands(data.pixels, { flipHorizontal: true });
    self.postMessage({ type: 'predictions', predictions });
});