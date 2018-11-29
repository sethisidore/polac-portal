import { Document, model, Model, Schema, Types } from 'mongoose';

/**
 * type interface for user with cadet profile
 */
export interface CadetType extends Document {
  cadetId: number;
  RC: number;
  squad: number;
  result?: Types.ObjectId[];
}

const CadetSchema = new Schema({
  cadetId: { type: Number, required: true, unique: true },
  reqularCourse: { type: Number, min: 1, required: true },
  squad: { type: Number, min: 1, max: 12, required: true },
  result: [{
    type: Schema.Types.ObjectId
  }]
});

export const Cadet: Model<CadetType> = model<CadetType>('Cadet', CadetSchema);
