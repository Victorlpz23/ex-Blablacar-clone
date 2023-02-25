// Requiring Rating model
const Rating = require('../models/rating.model');

// Requiring Trip model
const Trip = require('../models/trip.model');


// Require mongoose to validation errors
const mongoose = require('mongoose');


module.exports.rate = (req, res, next) => {
  res.render('ratings/new', { userId: req.params.id })
}

module.exports.doRate = (req, res, next) => {
  Rating.create({
    user: req.params.id, 
    observations: req.body.observations,
    rating: req.body.rating,
  })
  .then(() => {
    res.redirect('/')
  }).catch(next)
}

