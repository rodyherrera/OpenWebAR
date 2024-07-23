import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import http from 'http';
import compression from 'compression';
import { Server } from 'socket.io';

import globalErrorHandler from '@controllers/globalErrorHandler';
import { configureApp } from '@utilities/bootstrap';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.CORS_ORIGIN } });

configureApp({
    app,
    suffix: '/api/v1/',
    routes: [
        'auth',
        'entity'
    ],
    middlewares: [
        helmet(),
        compression(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
});

app.use(globalErrorHandler);

export { httpServer, io, app };