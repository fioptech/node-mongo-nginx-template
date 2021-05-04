import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from '../../auth/models/User';


export interface IProfile extends Document {
    user: IUser | string;
    fullName?: string
    birthDate?: string
    address?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new Schema({
    user: { type: Types.ObjectId, unique: true, required: true, ref: 'User' },
    fullName: { type: String, },
    birthDate: { type: String },
    address: { type: String },
    phone: { type: String },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    id: false
})

export const Profile = model<IProfile>("Profile", ProfileSchema)
