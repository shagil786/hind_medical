import mongoose, { Document, Schema } from 'mongoose';

export interface IVerificationToken extends Document {
  token: string;
  identifier: string;
  expires: Date;
}

const VerificationTokenSchema: Schema = new Schema({
  token: { type: String },
  identifier: { type: String },
  expires: { type: Date }
}, { timestamps: true });

export const VerificationToken = mongoose.model<IVerificationToken>('VerificationToken', VerificationTokenSchema);
