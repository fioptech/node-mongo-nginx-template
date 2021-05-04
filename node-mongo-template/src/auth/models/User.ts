import { Document, Schema, model } from 'mongoose';


export type UserType = 'admin' | 'user'

export interface IUser extends Document {
    username?: string;
    type: UserType;
    email?: string;
    password?: string;
    googleId?: string;
    facebookId?: string;
    appleId?: string
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String, select: false },
    googleId: { type: String },
    facebookId: { type: String },
    appleId: { type: String },
    type: { type: String, required: true }
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

export const User = model<IUser>("User", UserSchema)
