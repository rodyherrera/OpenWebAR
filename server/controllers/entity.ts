import Entity from '@models/entity';
import multer from 'multer';
import { Request, Response } from 'express';
import { catchAsync } from '@utilities/runtime';

export const findSimilarEntity = catchAsync(async (req: Request, res: Response): Promise<void> => {
    if(!req.file){
        res.status(400).json({
            status: 'error',
            message: 'Entity::FindSimilar::EmptyFile'   
        });
        return;
    }
    const { file } = req;
    res.status(200).json({
        status: 'success'
    })
});