import { Document, model, Schema, Types,
  PassportLocalDocument,
  PassportLocalModel, PassportLocalSchema } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

/**
 * type interface for user
 */
export interface UserType extends PassportLocalDocument {
  _id: Types.ObjectId;
  _type: string;
  username: string;
  password: string;
  attempts: number;
  profile: Types.ObjectId;
}

/**
 * type extending the user model
 */
interface UserModel<T extends Document> extends PassportLocalModel<T> {}


const UserSchema = new Schema({
  _type: { type: String, required: true, match: /(cadet)|(staff)/ },
  username: { type: String, unique: true, minlength: 5, maxlength: 15 },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, required: true },
  attempts: Number,
}, {
  timestamps: true,
  _id: false,
}) as PassportLocalSchema;


UserSchema.plugin(passportLocalMongoose);

export const User: UserModel<UserType> = model<UserType>('User', UserSchema);
export { Cadet, CadetType } from './cadet-profile.model';
