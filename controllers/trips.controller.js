// Requiring Trip model
const Trip = require('../models/trip.model')

// Defining actions for trips

// List of trips
module.exports.list = (req, res, next) => {
  Trip.find()
  .then((trips) => {
    res.render('trips/list', { trips })
  })
  .catch(next)
}

// Detail of trips
module.exports.detail = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/detail', { trip })
  })
  .catch(next)
}

// Create a trip
module.exports.create = (req, res, next) => {
    res.render('trips/new')
}

// Create a trip and get the info
module.exports.doCreate = (req, res, next) => {
  Trip.create(req.body) 
    .then(() => {
      res.redirect('/trips')
    })
    .catch(next)
}