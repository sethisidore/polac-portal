import {
  Document, model, Schema, Types,
  PassportLocalDocument,
  PassportLocalModel, PassportLocalSchema, PassportLocalOptions
} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

/**
 * type interface for user
 */
export interface UserType extends PassportLocalDocument {
  fullname: () => string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: string;
  birthday: Date;
  department?: Types.ObjectId;
  faculty?: Types.ObjectId;

  _id: Types.ObjectId;
  _type: string;
  username: string;
  password: string;
  email: string;
  cadetDetail: Types.ObjectId | undefined;
  staffDetail: Types.ObjectId | undefined;

  passwordResetToken?: string;
  passwordResetExpires?: string;
}

/**
 * type extending the user model
 */
interface UserModel<T extends Document> extends PassportLocalModel<T> { }


const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
  middleName: { type: String, minlength: 2, maxlength: 20 },
  birthday: { type: Date, default: Date.now },
  gender: { type: String, enum: ['male', 'female'], required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  faculty: {type: Schema.Types.ObjectId, ref: 'Faculty' },

  _type: { type: String, required: true, match: /(cadet)|(staff)/ },
  username: { type: String, unique: true, minlength: 5, maxlength: 15 },
  password: { type: String, required: true },
  email: { type: String },
  cadetDetail: { type: Schema.Types.ObjectId, ref: 'Cadet' },
  staffDetail: { type: Schema.Types.ObjectId },
  passwordResetToken: String,
  passwordResetExpires: String
}, {
    timestamps: true,
  }) as PassportLocalSchema;

const options: PassportLocalOptions = <PassportLocalOptions>{
  populateFields: 'cadetDetail staffDetail'
};

UserSchema.methods.fullname = () => {
  return this.middleName ? `${this.lastName} ${this.firstName} ${this.otherName}`
      : `${this.lastName} ${this.firstName}`;
};

UserSchema.plugin(passportLocalMongoose, options);

export const User: UserModel<UserType> = model<UserType>('User', UserSchema);
export { Cadet, CadetType } from './cadet-profile.model';
