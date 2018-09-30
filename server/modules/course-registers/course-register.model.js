const mongoose = require('mongoose');

const { Schema } = mongoose;

const registerSchema = new Schema({
  course_array: [{
    course_id: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['current', 'carry over'] },
  }],/*
  total_load: function() {
    let load;
    for( course in course_array ) {
      load += course.load;
    }
    if (load > 15 && load <= 24){ return load; }
    return undefined;
  },*/
  session: { type: String, required: true , match: /\d{4}\/\d{4}/ },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'Cadet' },
});

module.exports = mongoose.model('Register', registerSchema);
