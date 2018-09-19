const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Fname: {
    type: String, required: true, min: 2, max: 20,
  },
  Lname: {
    type: String, required: true, min: 2, max: 20,
  },
  Oname: { type: String, max: 20 },
  DoB: { type: Date, default: Date.now },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Do you not have a sex'],
  },
  dept: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no department'],
    ref: 'Dept',
  },
  sqd: { type: Number, min: 1, max: 12 },
  RC: { type: Number, min: 1 },
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Student', studentSchema);
