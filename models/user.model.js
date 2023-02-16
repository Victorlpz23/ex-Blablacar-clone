// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Require bcryptjs to encrypt the password
const bcrypt = require('bcryptjs');

// Creating a user schema
const userSchema = new Schema ({
  user: {
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
    required: true,
    minLength: 8
  },
},
  { timestamps: true }
);

// This lines are for encrypting the password before save or post the form
// Also, if the user edit the profile and not the password, we ensure that
// the password is not hashed again.
userSchema.pre('save', function(next) {
  if (this.isModified("password")) {
    bcrypt
    .hash(this.password, 10)
    .then((encryptedPassword) => {
      this.password = encryptedPassword
      next();
    })
    .catch(next)
  } else {
    next()
  }
});



// Export the model to use in the app
const User = mongoose.model('User', userSchema);
module.exports = User;