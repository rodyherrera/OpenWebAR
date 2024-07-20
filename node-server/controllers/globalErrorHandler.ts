import { Request, Response, NextFunction } from 'express';
import RuntimeError from '@utilities/runtimeError';

interface ErrorResponse{
    message: string;
    statusCode: number;
};

interface ValidationErrorShape{
    errors: {
        [key: string]: { message: string };
    }
};

type ErrorWithCode = Error & { code?: number; status?: number };

/**
 * Maps common errors to informative messages and appropriate HTTP status codes.
 *
 * @param {ErrorWithCode} err - The error object to analyze.
 * @returns {ErrorResponse} An object containing 'message' (string) and 'statusCode' (number).
*/
const parseError = (err: ErrorWithCode): ErrorResponse => {
    const errorMap: { [key: string]: ErrorResponse | ((code?: number) => ErrorResponse) } = {
        CastError: { message: 'Database::Cast::Error', statusCode: 400 },
        JsonWebTokenError: { message: 'JWT::Error', statusCode: 401 },
        TokenExpiredError: { message: 'JWT::Expired', statusCode: 401 },
        MongoServerError(code?: number){
            if(code == 11000) return { message: 'Database::Duplicated::Fields', statusCode: 400 };
            return { message: err.message, statusCode: err.status || 500 };
        },
        ValidationError(){
            const { errors } = err as unknown as ValidationErrorShape;
            const fields = Object.keys(errors);
            return {
                message: errors?.[fields?.[0]]?.message || 'Database::Validation::Error',
                statusCode: 401
            };
        }
    };
    const handler = errorMap[err.name] || errorMap.MongoServerError;
    return typeof handler === 'function' ? handler(err.code) : handler;
};

/**
 * Express middleware for centralized error handling.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
*/
const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errorWithStatus = err as ErrorWithCode;
    errorWithStatus.status = errorWithStatus.status || 500;
    errorWithStatus.message = errorWithStatus.message || 'Server Error';
    if(err instanceof RuntimeError){
        res.status(errorWithStatus.status).send({ status: 'error', message: errorWithStatus.message });
        return;
    }
    const { message, statusCode } = parseError(errorWithStatus);
    res.status(statusCode).send({ status: 'error', message });
};

export default errorHandler;