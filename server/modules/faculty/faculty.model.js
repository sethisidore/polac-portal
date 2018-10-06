const mongoose = require('mongoose');

const { Schema } = mongoose;

const facultySchema = new Schema({
  fac_id: { type: Number, required: true, max: 04, min: 01 },
  title: { type: String, required: true, },
  dean: {type: Schema.Types.ObjectId, ref: 'Lecturer' },
});

module.exports = mongoose.model('Faculty', facultySchema);
