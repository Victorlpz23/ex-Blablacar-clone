// Requiring hbs for use it below
const hbs = require('hbs');


// Method for create and use partials views 
hbs.registerPartials(`${__dirname}/../views/partials`);


// Method to know if the trip is owned by the creator 
hbs.registerHelper('isOwnedBy', (trip, user, options) => {
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
  return Math.round(receivedRatings.map(x => x = x.rating).reduce((a, b) => a + b, 0) / receivedRatings.length);
});


// Method to active current path in hbs
hbs.registerHelper("pathActive", (currentPath, desiredPath, options) => {
  if (currentPath === desiredPath) {
    return options.fn()
  } else {
    return options.inverse()
  }
});