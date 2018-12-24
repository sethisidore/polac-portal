import { Document, Schema, Types, Model, model } from 'mongoose';

export interface TipsType extends Document {
  _id: Types.ObjectId;
  email?: string;
  subject: string;
  suggestion: string;
}

const TipsSchema: Schema = new Schema({
  email: String,
  subject: String,
  suggestion: { type: String, required: true }
});

export const Tips: Model<TipsType> = model<TipsType>('Tips', TipsSchema);
