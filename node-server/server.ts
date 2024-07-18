import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { httpServer } from '@config/express';
import { loadModel } from '@services/handpose';
import '@config/ws';

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';

httpServer.listen(SERVER_PORT as number, SERVER_HOST, async () => {
    await loadModel();
    console.log(`Server running at http://${SERVER_HOST}:${SERVER_PORT}/.`);
});