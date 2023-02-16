// Requiring User model
const User = require('../models/user.model');


// Defining actions for users

// Create a user
module.exports.create = (req, res, next) => {
  res.render('/login')
}

// Create a user and get the info
module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/trips')
    })
    .catch(next)
};