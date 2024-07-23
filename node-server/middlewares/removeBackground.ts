import removeBackground from '@services/removeBackground';
import { Request, Response, NextFunction } from 'express';

const removeBackgroundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.file){
        next();
        return;
    }
    const endpoint = `http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/${req.file.filename}`;
    removeBackground({ url: endpoint }, req.file.path);
    next();
};

export default removeBackgroundMiddleware;