const mongoose = require('mongoose');

const { Schema } = mongoose;

const lecturerSchema = new Schema({
  Fname: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  Lname: {
    type: String, required: true, minlength: 2, maxlength: 20,
  },
  Oname: {
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

module.exports = mongoose.model('Lecturer', lecturerSchema);
