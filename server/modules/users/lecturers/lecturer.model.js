const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const lecturerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  last_name: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  mid_name: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  dept: { type: Schema.Types.ObjectId, required: true, ref: 'Dept' },
  rank: {
    type: String,
    enum: [
      'Assistant Lecturer', 'Lecturer II', 'Lecturer I', 'Senior Lecturer',
      'Associate Professor', 'Professor',
    ],
  },
  degrees: [{ type: String, required: true }],
});

lecturerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Lecturer', lecturerSchema);
