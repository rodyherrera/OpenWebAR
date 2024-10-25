import { io } from '@config/express';
import wsController from '@controllers/ws';

wsController(io);