import { Document, model, Model, Schema, Types } from 'mongoose';

/**
 * type interface for user with cadet profile
 */
export interface CadetType extends Document {
  firstName: string;
  lastName: string;
  midName?: string;
  birthday: Date;
  gender: string;

  department?: Types.ObjectId;
  faculty?: Types.ObjectId;

  cadetId: number;
  RC: number;
  squad: number;
}

const CadetSchema = new Schema({
  cadetId: { type: Number, required: true, unique: true },
  firstName: { type: String, minlength: 2, maxlength: 20, required: true },
  lastName: { type: String, minlength: 2, maxlength: 20, required: true },
  midName: { type: String, minlength: 2, maxlength: 20 },
  birthday: { type: Date, default: Date.now },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Do you not have a sex'],
  },
  department: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no department'],
    ref: 'Dept',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no Faculty'],
    ref: 'Faculty',
  },
  RC: { type: Number, min: 1 },
  squad: { type: Number, min: 1, max: 12 },
});

export const Cadet: Model<CadetType> = model<CadetType>('Cadet', CadetSchema);
