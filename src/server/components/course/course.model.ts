import { Document, model, Model, Schema, Types } from 'mongoose';

export interface CourseType extends Document {
  _id: Types.ObjectId;
  courseId: string;
  title: string;
  creditLoad: number;
  level: number;
  semester: string;
  department: string;
  assignedTo: Types.ObjectId[];
}

const courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true, maxlength: 6, minlength: 6, match: /\w{3}\d{3}/ },
  title: { type: String, required: true, maxlength: 30 },
  creditLoad: { type: String, required: true, min: 1, max: 4 },
  level: { type: Number, required: true, min: 1, max: 5 },
  semester: {type: String, required: true, enum: ['first', 'second'], match: /(first)|(second)/ },
  department: { type: Schema.Types.ObjectId },
  assignedTo: [{ type: Schema.Types.ObjectId }],
});

export const Course: Model<CourseType> = model<CourseType>('Course', courseSchema);
