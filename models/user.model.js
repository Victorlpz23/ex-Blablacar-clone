// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a user schema
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

// Export the model to use in the app
const User = mongoose.model('User', userSchema);
module.exports = User;