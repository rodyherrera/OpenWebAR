import mongoose, { Document, Model } from 'mongoose';

interface IImage extends Document{
    path: string;
    hash: number[];
};

const imageSchema = new mongoose.Schema<IImage>({
    path: {
        type: String,
        required: true
    },
    hash: {
        type: [Number],
        required: true
    }
}, {
    timestamps: true
});

imageSchema.index({ hash: 1 });

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;