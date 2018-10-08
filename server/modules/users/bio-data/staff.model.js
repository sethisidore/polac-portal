const mongoose = require('mongoose');

const { Schema } = mongoose;

const staffSchema = new Schema({
  staff_id: { type: String, required: true },
  name: {
    first: { type: String, minlength: 2, maxlength: 20, required: true },
    middle: { type: String, minlength: 2, maxlength: 20 },
    last: { type: String, minlength: 2, maxlength: 20, required: true },
  },
  birthday: {type: Date, default: Date.now },
  department: { type: Schema.Types.ObjectId, ref: 'Dept' },
  faculty: { type: Schema.Types.ObjectId, ref:'Faculty' },
  position: {
    type: String,
    enum: [
      'Assistant Lecturer', 'Lecturer II', 'Lecturer I', 'Senior Lecturer',
      'Associate Professor', 'Professor',
    ],
  },
  degrees: [{ type: String, required: true }],
}, {
  _id: false,
});

staffSchema
  .virtual('age')
  .get(() => {
  return Date.now() - birthday;
  });

module.exports = mongoose.model('Staff', staffSchema);
