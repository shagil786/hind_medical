import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  sessionToken: string;
  userId: string;
  expires: Date;
}

const SessionSchema: Schema = new Schema({
  sessionToken: { type: String, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  expires: { type: Date }
}, { timestamps: true });

export const Session = mongoose.model<ISession>('Session', SessionSchema);
