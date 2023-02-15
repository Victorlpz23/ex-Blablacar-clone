const Trip = require('../models/trip.model')

// Defining actions for trips

module.exports.list = (req, res, next) => {
  Trip.find()
  .then((trips) => {
    res.render('trips/list', { trips })
  })
  .catch(next)
}