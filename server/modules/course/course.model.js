const mongoose = require('mongoose');

const { Schema } = mongoose; // Defines a schema using object destructuralization

const courseSchema = new Schema({
  _id: {
    type: String, max: 7, min: 7, required: true, uppercase: true, match: /[A-Z]{3}-\d{3}/,
  },
  title: { type: String, max: 75, required: true },
  summary: { type: String, maxlength: 250, required: true },
  load: { type: Number, required: true, default: 2 },
  pre_req: { type: Schema.Types.ObjectId, ref: 'Course' },
  lecturer: [{ type: Schema.Types.ObjectId, required: true }],
  origin: { type: Schema.Types.ObjectId, required: true, ref: 'Dept' },
});

module.exports = mongoose.model('Course', courseSchema);
