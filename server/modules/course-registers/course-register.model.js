const mongoose = require('mongoose');

const { Schema } = mongoose;

const registerSchema = new Schema({
  course_array: [{
    course_id: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['current', 'carry over'] },
  }],
  session: { type: String, required: true , match: /\d{4}\/\d{4}/ },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
});

module.exports = mongoose.model('Register', registerSchema);
