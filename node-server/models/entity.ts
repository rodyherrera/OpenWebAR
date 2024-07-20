import mongoose, { Document, Model, ObjectId } from 'mongoose';

interface IEntity extends Document{
    name: string;
    description: string;
    samples: string[],
    user: ObjectId
};

const EntitySchema = new mongoose.Schema<IEntity>({
    name: {
        type: String,
        minlength: [8, 'Entity::Name::MinLength'],
        maxlength: [16, 'Entity:Name::MaxLength'],
        required: [true, 'Entity::Name::Required'],
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        minlength: [8, 'Entity::Description::MinLength'],
        maxlength: [255, 'Entity::Description::MaxLength'],
        required: [true, 'Entity::Description::Required'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

EntitySchema.index({ user: 1, name: 1 }, { unique: true });
EntitySchema.index({ name: 'text', description: 'text' });

const Entity = mongoose.model<IEntity>('Entity', EntitySchema);

export default Entity;