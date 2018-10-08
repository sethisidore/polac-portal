const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, match: /\w+[_]?[\w+|\d+]?/ },
  password: { type: String, required: true, minlength:8, maxlength: 16 },
  email: { type: String },
  pic: { type: String },
  _type: { 
    type: String,
    enum: ['cadet', 'staff', 'both'],
    required: true,
  },
  profile: { type: Schema.Types.ObjectId, required: true },
}, {
  _id: false,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
