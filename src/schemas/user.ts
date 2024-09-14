import mongoose, {Document, Schema} from "mongoose";
import { ISession } from "./Session";
import { IAccount } from "./Account";

export interface IUser extends Document {
    name?: string;
    email?: string;
    password?: string;
    emailVerified?: Date;
    image?: string;
    role?: string;
    sessions?: ISession[];
    accounts?: IAccount[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true, default: null },
    password: {type: String, default: null},
    emailVerified: { type: Date, default: null },
    image: { type: String, default: null },
    role: { type: String, default: null },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
  });
  
  export const User = mongoose.model<IUser>('User', UserSchema);