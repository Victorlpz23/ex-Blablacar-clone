// Requiring Trip model
const Trip = require('../models/trip.model')

// Defining actions for trips

// List of trips
module.exports.list = (req, res, next) => {
  Trip.find()
  .populate('user')
  .then((trips) => {
    res.render('trips/list', { trips })
  })
  .catch(next)
}

// Detail of trips
module.exports.detail = (req, res, next) => {
  Trip.findById(req.params.id)
  .populate('user')
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
  req.body.user = req.user.id
  Trip.create(req.body) 
    .then(() => {
      res.redirect('/trips')
    })
    .catch(next)
}

module.exports.update = (req,res,next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
  res.render('trips/edit', { trip })
  }).catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, req.body)
  .then((trip) => {
    res.redirect(`/trips/${req.params.id}`)
  })
  .catch(next)
}

module.exports.delete = (req, res, next) => {}