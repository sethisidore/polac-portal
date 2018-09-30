const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const cadetSchema = new Schema({
  cadet_no: { type: String, match: /\d+/ },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: {
    type: String, required: true, min: 2, max: 20,
  },
  last_name: {
    type: String, required: true, min: 2, max: 20,
  },
  mid_name: { type: String, max: 20 },
  birthday: { type: Date, default: Date.now },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Do you not have a sex'],
  },
  dept: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no department'],
    ref: 'Dept',
  },
  squad: { type: Number, min: 1, max: 12 },
  RC: { type: Number, min: 1 },
});

// Create virtual to Get full ID
cadetSchema
.virtual('NPA_No')
.get(() => {
  return 'NPA/' + RC + 'RC/' + dept.dept_id + '/' + squad + '/' + cadet_no;
});

cadetSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Cadet', cadetSchema);
