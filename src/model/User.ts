import { model, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    roles: string;
    refreshToken: string
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

export default model('User', UserSchema);
