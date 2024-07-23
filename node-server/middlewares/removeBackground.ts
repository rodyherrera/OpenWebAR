import removeBackground from '@services/removeBackground';
import { Request, Response, NextFunction } from 'express';

const removeBackgroundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.file){
        next();
        return;
    }
    removeBackground({ url: req.file.path }, req.file.path);
    next();
};

export default removeBackgroundMiddleware;