const mongoose = require('mongoose');

const { Schema } = mongoose; // Defines a schema using object destructuralization

const courseSchema = new Schema({
  _id: {
    type: String, max: 6, min: 6, required: true, uppercase: true,
  },
  title: { type: String, max: 75, required: true },
  summary: { type: String, maxlength: 250, required: true },
  load: { type: Number, required: true, default: 2 },
  pre_req: { type: Schema.Types.ObjectId, ref: 'Course' },
  lecturer: [{ type: Schema.Types.ObjectId, required: true }],
});

module.exports = mongoose.model('Course', courseSchema);
