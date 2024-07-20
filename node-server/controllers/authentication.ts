import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '@models/user';
import HandlerFactory from '@controllers/handlerFactory';
import { catchAsync, filterObject } from '@utilities/runtime';

interface AuthenticatedRequest extends Request{
    user?: IUser;
}

const UserFactory = new HandlerFactory({
    model: User,
    fields: [
        'username',
        'fullname',
        'email',
        'password',
        'passwordConfirm',
    ]
});

const signToken = (identifier: string): string => {
    return jwt.sign({ id: identifier }, process.env.SECRET_KEY!, {
        expiresIn: process.env.JWT_EXPIRATION_DAYS
    });
};

const createAndSendToken = (res: Response, statusCode: number, user: IUser): void => {
    const userId = user?._id as string;
    const token = signToken(userId);
    (user as any).password = undefined;
    (user as any).__v = undefined;
    res.status(statusCode).json({
        status: 'success',
        data: { token, user }
    });
};

export const signIn = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(new Error('Authentication::EmailOrPasswordRequired'));
    }
    const requestedUser = await User.findOne({ email }).select('+password');
    if(!requestedUser || !(await requestedUser.isCorrectPassword(password, requestedUser.password))){
        return next(new Error('Authentication::EmailOrPasswordIncorrect'));
    }
    createAndSendToken(res, 200, requestedUser);
});

export const signUp = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, fullname, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({ username, fullname, email, password, passwordConfirm });
    createAndSendToken(res, 201, newUser);
});

export const updateMyPassword = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const requestedUser = await User.findById((req.user as IUser).id).select('+password');
    if(!requestedUser){
        return next(new Error('Authentication::Update::UserNotFound'));
    }
    if(!(await requestedUser.isCorrectPassword(req.body.passwordCurrent, requestedUser.password))){
        return next(new Error('Authentication::Update::PasswordCurrentIncorrect'));
    }
    if(await requestedUser.isCorrectPassword(req.body.passwordConfirm, requestedUser.password)){
        return next(new Error('Authentication::Update::PasswordsAreSame'));
    }
    requestedUser.password = req.body.password;
    requestedUser.passwordConfirm = req.body.passwordConfirm;
    await requestedUser.save();
    createAndSendToken(res, 200, requestedUser);
});

export const deleteMyAccount = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const requestedUser = await User.findByIdAndDelete((req.user as IUser).id);
    if(!requestedUser) return next(new Error('Authentication::Delete::UserNotFound'));
    res.status(204).json({
        status: 'success',
        data: requestedUser
    });
});

export const getMyAccount = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const requestedUser = await User.findById((req.user as IUser)._id);
    if(!requestedUser) return next(new Error('Authentication::Get::UserNotFound'));
    res.status(200).json({
        status: 'success',
        data: requestedUser
    });
});

export const updateMyAccount = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const filteredBody = filterObject(req.body, 'username', 'fullname', 'email');
    const requestedUser = await User.findByIdAndUpdate((req.user as IUser).id, filteredBody, {
        new: true,
        runValidators: true
    });
    if(!requestedUser) return next(new Error('Authentication::Update::UserNotFound'));
    res.status(200).json({
        status: 'success',
        data: requestedUser
    });
});

export const deleteUser = UserFactory.deleteOne();
export const getUser = UserFactory.getOne();
export const getAllUsers = UserFactory.getAll();
export const updateUser = UserFactory.updateOne();
export const createUser = UserFactory.createOne();