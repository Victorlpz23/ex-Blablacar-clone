// Requiring User model
const User = require('../models/user.model');

// Require bcryptjs to encrypt the password
const bcrypt = require('bcryptjs')


// Defining actions for users

// Create a user
module.exports.create = (req, res, next) => {
  res.render('users/new')
};

// Create a user and get the info
module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/login')
    })
    .catch(next)
};

// Form to complete the user info
module.exports.login = (req, res, next) => {
  res.render('users/login')
};


// Post the user info and compare to the database
module.exports.doLogin = (req, res, next) => {
 User.findOne({ email: req.body.email })
  .then((user) => {
    bcrypt
    .compare(req.body.password, user.password)
      .then((ok) => {
        req.session.userId = user.id
        res.redirect('/trips')
      })
      .catch(next)
  })
  .catch(next)
};

// List of users
module.exports.list = (req, res, next) => {
  User.find()
  .then((users) => {
    res.render('users/list', { users })
  })
  .catch(next)
 }

// User profile
 module.exports.profile = (req, res, next) => {
  res.render('users/profile')
};

// User profile edit
module.exports.update = (req, res, next) => {
  res.render('users/edit')
};


// Upload changes for the User edit
module.exports.doUpdate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path
  }
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/profile')
  })
  .catch(next)
};
