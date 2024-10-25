import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { httpServer } from '@config/express';
import HandposeDetector from '@services/handposeDetector';
import mongoConnector from '@utilities/mongoConnector';
import { redisConnector } from '@utilities/redisClient';
import '@config/ws';

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';

httpServer.listen(SERVER_PORT as number, SERVER_HOST, async () => {
    await Promise.all([
        mongoConnector(),
        redisConnector(),
        HandposeDetector.loadModel()
    ]);
    console.log(`@server.ts: server running at http://${SERVER_HOST}:${SERVER_PORT}/.`);
});