import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends Document{
    username: string;
    fullname: string;
    email: string;
    password: string;
    passwordConfirm: string | undefined;
    role: 'user' | 'admin';
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    isCorrectPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    isPasswordChangedAfterJWFWasIssued(JWTTimeStamp: number): boolean;
};

const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        minlength: [8, 'User::Username::MinLength'],
        maxlength: [16, 'User::Username::MaxLength'],
        required: [true, 'User::Username::Required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        minlength: [8, 'User::Fullname::MinLength'],
        maxlength: [32, 'User::Fullname::MaxLength'],
        required: [true, 'User::Fullname::Required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User::Email::Required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'User::Email::Validate']
    },
    password: {
        type: String,
        required: [true, 'User::Password::Required'],
        minlength: [8, 'User::Password::MinLength'],
        maxlength: [16, 'User::Password::MaxLength'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'User::PasswordConfirm::Required'],
        validate: {
            validator: function(v){
                return v === this.password;
            },
            message: 'User::PasswordConfirm::Validate'
        }
    },
    role: {
        type: String,
        lowercase: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
});

UserSchema.index({ username: 'text', fullname: 'text', email: 'text' });

UserSchema.pre('save', async function(this: IUser, next){
    try{
        if(!this.isModified('password')) return next();
        this.username = this.username.replace(/\s/g, '');
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
        if(this.isNew) return next();
        this.passwordChangedAt = new Date(Date.now() - 1000);
        next();
    }catch(error: any){
        next(error);
    }
});

UserSchema.methods.isCorrectPassword = async function(this: IUser, candidatePassword: string, userPassword: string): Promise<boolean>{
    return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.isPasswordChangedAfterJWFWasIssued = function(this: IUser, JWTTimeStamp: number): boolean{
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;