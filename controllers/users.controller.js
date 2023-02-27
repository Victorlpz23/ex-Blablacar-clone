// Requiring User model
const User = require('../models/user.model');

// Requiring Trip model
const Trip = require('../models/trip.model');

// Require bcryptjs to encrypt the password
const bcrypt = require('bcryptjs');

// Require mongoose to validation errors
const mongoose = require('mongoose');


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
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/new", { errors: error.errors, user: req.body });
      } else {
        next(error);
      }
    })
}


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
        res.redirect('/')
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("users/login", { errors: error.errors, user: req.body });
        } else {
          next(error);
        }
      })
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("users/login", { errors: error.errors, user: req.body });
    } else {
      next(error);
    }
  })
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
  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
  .then(() => {
    res.redirect('/profile')
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("users/edit", { errors: error.errors, user: req.body });
    } else {
      next(error);
    }
  })
};


// User profile rides
module.exports.rides = (req, res, next) => {
  Trip.find()
  .populate('user')
  .then((trips) => {
    res.render('users/rides', { trips })
  })
  .catch(next)
};


// Controller for log out
module.exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
}