import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import http from 'http';
import compression from 'compression';
import { Server } from 'socket.io';

import { configureApp } from '@utilities/bootstrap';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.CORS_ORIGIN } });

configureApp({
    app,
    suffix: '/api/v1/',
    routes: [
    ],
    middlewares: [
        helmet(),
        compression(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
});

export { httpServer, io, app };