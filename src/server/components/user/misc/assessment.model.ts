import { Document, model, Model, Schema, Types } from 'mongoose';

interface AssessmentType extends Document {
  _id: Types.ObjectId;
  ownedBy: Types.ObjectId;
  course: Types.ObjectId;
  test: number;
  assignments: number;
  exam: number;
}

const assessmentSchema: Schema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  assignments: Number,
  test: Number,
  exam: Number,
  ownedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Assessment: Model<AssessmentType> = model<AssessmentType>('Assessment', assessmentSchema);
