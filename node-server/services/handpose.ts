import { Worker } from 'worker_threads';
import os from 'os';

const numCPUs = Math.ceil(os.cpus().length / 2);
const workerPool: Worker[] = [];

export const getPredictions = async (blob: string): Promise<any> => {
    if(workerPool.length === 0){
        throw new Error('@services/handpose.ts - getPredictions: worker pool not initialized.');
    }
    const worker = workerPool[Math.floor(Math.random() * workerPool.length)];
    return new Promise((resolve, reject) => {
        worker.postMessage({ type: 'predict', blob });
        const messageHandler = (message: any) => {
            if(message.type === 'result'){
                worker.removeListener('message', messageHandler);
                resolve(message.data);
            }else if(message.type === 'error'){
                worker.removeListener('message', messageHandler);
                reject(new Error(message.message));
            }
        };
        worker.on('message', messageHandler);
    });
};

export const loadModel = async (): Promise<void> => {
    console.log('@services/handpose.ts: creating worker threads.');
    for(let i = 0; i < numCPUs; i++){
        await new Promise<void>((resolve, reject) => {
            const worker = new Worker('./services/handposeWorker.cjs');
            worker.on('message', (message: string) => {
                if(message !== 'modelLoaded') return;
                console.log('@services/handpose.ts: worker', i + 1, 'created.');
                workerPool.push(worker);
                resolve();
            });
            worker.on('error', reject);
        });
    }
};

process.on('exit', () => {
    workerPool.forEach((worker) => worker.terminate());
});