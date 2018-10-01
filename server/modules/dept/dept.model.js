const mongoose = require('mongoose');

const { Schema } = mongoose;

const deptSchema = new Schema({
  dept_id: { type: String, lowercase: true, match: /\w{3}/ }, 
  name: {
    type: String, required: true, max: 50, unique: true,
  },
  HOD: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
});

module.exports = mongoose.model('Dept', deptSchema);
