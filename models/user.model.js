// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating emails for admins
const ADMIN_USERS = (process.env.ADMIN_USERS || 'admin@example.org')
  .split(',')
  .map(email => email.trim())


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
  role: {
    type: String,
    enum: ["guest", "admin"],
    default: "guest"
  },
},
  { timestamps: true }
);

// This lines are for encrypting the password before save or post the form
// Also, if the user edit the profile and not the password, we ensure that
// the password is not hashed again.
userSchema.pre('save', function(next) {
  const user = this;

  if (ADMIN_USERS.includes(user.email)) {
    user.role = 'admin';
  }

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