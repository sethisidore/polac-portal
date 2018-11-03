import { Document, model, Model, Schema, Types } from 'mongoose';

export interface FacultyType extends Document {
  _di: Types.ObjectId;
  facultyId: number;
  name: string;
  dean: Types.ObjectId;
}

const FacultySchema: Schema = new Schema({
  facultyId: { type: Number, required: true, max: 4, min: 1 },
  name: { type: String, required: true, },
  dean: {type: Schema.Types.ObjectId, ref: 'Lecturer' },
});

export const Faculty: Model<FacultyType> = model<FacultyType>('Faculty', FacultySchema);
