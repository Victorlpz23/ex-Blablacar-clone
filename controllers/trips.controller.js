// Requiring Trip model
const Trip = require('../models/trip.model');

// Requiring User model
const User = require('../models/user.model');

// Require mongoose to validation errors
const mongoose = require('mongoose');

// Defining actions for trips

// List of trips
module.exports.list = (req, res, next) => {
  // const { latFrom, lngFrom, latTo, lngTo } = req.query;
  // const criterial = {};

  // // criterial.seats = seats;
  // // criterial.date = date;
  // criterial.locationFrom = {
  //   $near: {
  //     $geometry: {
  //       type: "Point",
  //       coordinates: [lngFrom, latFrom]
  //     },
  //     $maxDistance: 7000
  //  }
  // }

  // criterial.locationTo = {
  //   $near: {
  //     $geometry: {
  //       type: "Point",
  //       coordinates: [lngTo, latTo]
  //     },
  //     $maxDistance: 7000
  //  }
  // }


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
  const { latFrom, lngFrom, latTo, lngTo } = req.body;

  const trip = req.body;
  trip.user = req.user.id;

  if ( latFrom && lngFrom && latTo && lngTo) {
    trip.locationFrom = {
      type: 'Point',
      coordinates: [lngFrom, latFrom]
    }
    trip.locationTo = {
      type: 'Point',
      coordinates: [lngTo, latTo]
    }
  }
  Trip.create(trip) 
    .then(() => {
      res.redirect('/trips')
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("trips/new", { errors: error.errors, trip: req.body });
      } else {
        next(error);
      }
    })
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
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("trips/edit", { errors: error.errors, trip: req.body });
    } else {
      next(error);
    }
  })
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