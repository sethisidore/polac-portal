const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deptSchema = new Schema({
    name: {type: String, required: true, max: 50},
    HoD: {type: Schema.Types.ObjectId, required: true}
})