// Requiring Rating model
const Rating = require('../models/rating.model');

// Requiring Trip model
const Trip = require('../models/trip.model');


// Require mongoose 
const mongoose = require('mongoose');

// Rendering rate page
module.exports.rate = (req, res, next) => {
  res.render('ratings/new', { userId: req.params.id })
}


// Post the rating for one currentUser to other
module.exports.doRate = (req, res, next) => {
  Rating.create({
    user: req.params.id, 
    observations: req.body.observations,
    rating: req.body.rating,
    sender: req.user.id,
  })
  .then(() => {
    res.redirect('/')
  }).catch(next)
}

