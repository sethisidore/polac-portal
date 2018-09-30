const mongoose = require('mongoose');

const { Schema } = mongoose;

const deptSchema = new Schema({
  dept_id: { type: String, lowercase: true, match: /\w{3}/ }, 
  name: {
    type: String, required: true, max: 50, unique: true,
  },
<<<<<<< HEAD
  HoD: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
  est: { type: Date, default: Date.now },
=======
  HOD: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
>>>>>>> renamed student to cadet
});

module.exports = mongoose.model('Dept', deptSchema);
