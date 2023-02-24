// Requiring Trip model
const Trip = require('../models/trip.model');

// Requiring User model
const User = require('../models/user.model')

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

// Update a Trip
module.exports.update = (req,res,next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
  res.render('trips/edit', { trip })
  }).catch(next)
}

// Update a Trip with changes
module.exports.doUpdate = (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
  .then((trip) => {
    res.redirect(`/trips/${req.params.id}`)
  })
  .catch(next)
}

// Delete a Trip
module.exports.delete = (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => {
      if(!trip) {
        res.redirect('/trips')
      } else if (trip.user == req.user.id) {
        trip.delete()
          .then(() => res.redirect('/trips'))
          .catch(next)
      } else {
        res.redirect('/trips')
      }
  })
  .catch(next)
}

// Book a trip
module.exports.book = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/book', { trip })
  })
  .catch(next);
}

// Asign a trip booked to the user
module.exports.doBook = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    req.user.adquiredTrips.push(req.params.id)
    User.findByIdAndUpdate(req.user.id, req.user)
      .then(() => {
        if (trip.seats <= 0) {
          res.send("Trip Complete")
        }
        trip.seats--
        Trip.findByIdAndUpdate(req.params.id, { seats: trip.seats})
        .then(() => next()).catch(next)
        res.redirect('/profile/rides')
      }).catch(next);
  }).catch(next);
}