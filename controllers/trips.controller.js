const Trip = require('../models/trip.model')

// Defining actions for trips

module.exports.list = (req, res, next) => {
  Trip.find()
  .then((trips) => {
    res.render('trips/list', { trips })
  })
  .catch(next)
}

module.exports.detail = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/detail', { trip })
  })
  .catch(next)
}

module.exports.create = (req, res, next) => {
    res.render('trips/new')
}

module.exports.doCreate = (req, res, next) => {
  Trip.create(req.body) 
    .then(() => {
      res.redirect('/trips')
    })
    .catch(next)
}