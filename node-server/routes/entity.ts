import express from 'express';
import multer from '@middlewares/multer';
import removeBackground from '@middlewares/removeBackground';
import * as entityController from '@controllers/entity';

const router = express.Router();

router.post('/find-similar/', multer.single('file'), removeBackground, entityController.findSimilarEntity);

export default router;