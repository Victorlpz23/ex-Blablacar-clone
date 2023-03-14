// Requiring hbs for use it below
const hbs = require('hbs');


// Requiring moment to change the date format
const moment = require('moment')


// Method for create and use partials views 
hbs.registerPartials(`${__dirname}/../views/partials`);


// Method to know if the trip is owned by the creator 
hbs.registerHelper('isOwnedBy', (trip, user, options) => {
  console.log(`This is the trip ${trip?.user?.id.toString() === user?.id.toString()}`)
  if (trip?.user?.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});

// Method to disable the trip if is complete
hbs.registerHelper('isTripComplete', (trip, options) => {
  if (trip?.seats <= 0 ) {
    return options.fn()
  } else {
    return options.inverse()
  }
});

// Method to calculate the average of ratings
hbs.registerHelper('ratingAverage', (receivedRatings) => {
  if (receivedRatings.length === 0) {
    return ("Not ratings yet");
  } else {
  return Math.round(receivedRatings.map(x => x = x.rating).reduce((a, b) => a + b, 0) / receivedRatings.length);
  }
});


// Method to active current path in hbs
hbs.registerHelper("pathActive", (currentPath, desiredPath, options) => {
  if (currentPath === desiredPath) {
    return options.fn()
  } else {
    return options.inverse()
  }
});

// Method to know if the trip is not owned by the creator 
hbs.registerHelper('isOwnedNotBy', (trip, user, options) => {
  if (user.adquiredTrips.map(x => x.user.id).includes(trip.user.id)) {
    if (trip?.user?.id != user?.id) {
    return options.fn();
    }
  } else {
    return options.inverse();
  }
});

// Method to know if the message is owned by the creator 
hbs.registerHelper('isOwnedMessage', (from, user, options) => {
  if (from?.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});

// Method to change the date format 
hbs.registerHelper('formatDate', (date) => {
  return moment(date, "YYYY-MM-DD").format("ddd, Do MMMM")
}) 


// Method to calculate the arrive Hour 
hbs.registerHelper('arriveHour', (departureTime) => {
  return moment(departureTime, 'HH:mm').add(7, 'Hours').format('HH:mm')
}) 

