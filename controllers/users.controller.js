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
      res.redirect('/trips')
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