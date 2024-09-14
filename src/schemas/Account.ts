import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  oauthTokenSecret?: string;
  oauthToken?: string;
}

const AccountSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refreshToken: { type: String, default: null },
  accessToken: { type: String, default: null },
  expiresAt: { type: Number, default: null },
  tokenType: { type: String, default: null },
  scope: { type: String, default: null },
  idToken: { type: String, default: null },
  sessionState: { type: String, default: null },
  oauthTokenSecret: { type: String, default: null },
  oauthToken: { type: String, default: null }
}, { timestamps: true });

export const Account = mongoose.model<IAccount>('Account', AccountSchema);
