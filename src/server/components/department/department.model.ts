import { Document, model, Model, Schema, Types } from 'mongoose';

export interface DepartmentType extends Document {
  _id: Types.ObjectId;
  name: string;
  faculty?: Types.ObjectId;
  headOfDepartment?: Types.ObjectId;
  status?: {
    accreditted: boolean,
    date: Date,
  };
}

const DepartmentSchema: Schema = new Schema({
  deptId: { type: String, required: true },
  name: { type: String, required: true },
  faculty: { type: Schema.Types.ObjectId },
  headOfDepartment: { type: Schema.Types.ObjectId },
  status: {
    accreditted: { type: Boolean },
    date: { type: Date, default: Date.now }
  }
});

export const Department: Model<DepartmentType> = model<DepartmentType>('Department', DepartmentSchema);
