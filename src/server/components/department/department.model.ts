import { Document, model, Model, Schema, Types } from 'mongoose';

export interface DepartmentType extends Document {
  _id: Types.ObjectId;
  deptId: string;
  name: string;
  faculty?: Types.ObjectId;
  headOfDepartment?: Types.ObjectId;
  accreditation?: {
    status: boolean,
    date: Date,
  };
}

const DepartmentSchema: Schema = new Schema({
  deptId: { type: String, unique: true },
  name: { type: String, required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  headOfDepartment: { type: Schema.Types.ObjectId, ref: 'User' },
  accreditation: {
    status: { type: Boolean },
    date: { type: Date, default: Date.now }
  }
});

export const Department: Model<DepartmentType> = model<DepartmentType>('Department', DepartmentSchema);
