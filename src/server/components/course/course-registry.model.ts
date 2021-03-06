import { Document, model, Schema } from 'mongoose';

export interface CourseRegistryType extends Document {
  _id: string;
  courses: [{
    courseId: string;
    status: string;
  }];
  session: string;
  registeredOn: Date;
  registeredBy: string;
}

const courseRegistrySchema = new Schema({
  session: { type: String, required: true , match: /\d{4}\/\d{4}/ },
  courses: [{
    courseId: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['current', 'carry over'] },
  }],
  registeredBy: { type: Schema.Types.ObjectId, required: true, ref: 'Cadet' },
  registeredOn: { type: Date, default: Date.now },
});

export const CourseRegistry = model<CourseRegistryType>('CourseRegistry', courseRegistrySchema);
