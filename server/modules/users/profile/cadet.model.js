const mongoose = require('mongoose');

const { Schema } = mongoose;

const cadetSchema = new Schema({
  cadet_id: { type: String, match: /\d+/, unique: true },
  name: {
    first: { type: String, minlength: 2, maxlength: 20, required: true },
    middle: { type: String, minlength: 2, maxlength: 20 },
    last: { type: String, minlength: 2, maxlength: 20, required: true },
  },
  birthday: { type: Date, default: Date.now },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Do you not have a sex'],
  },
  department: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no department'],
    ref: 'Dept',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Why no Faculty'],
    ref: 'Faculty',
  },
  RC: { type: Number, min: 1 },
  squad: { type: Number, min: 1, max: 12 },
},{
  _id: false,
});

// Create virtual to Get full ID
cadetSchema
.virtual('NPA_No')
.get(() => {
  return 'NPA/' + RC + 'RC/' + faculty.fac_id + '/' + squad + '/' + cadet_id;
});

cadetSchema
.virtual('age')
.get(() => {
  return Date.now() - birthday;
});

module.exports = mongoose.model('Cadet', cadetSchema);
