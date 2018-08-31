const mongoose = require('mongoose');

const { Schema } = mongoose;

const deptSchema = new Schema({
  name: {
    type: String, required: true, max: 50, unique: true,
  },
  HoD: { type: Schema.Types.ObjectId, required: true, ref: 'Lecturer' },
  est: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dept', deptSchema);
