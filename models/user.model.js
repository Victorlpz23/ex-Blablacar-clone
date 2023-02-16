// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});


const User = mongoose.model('User', userSchema);
module.exports = User;