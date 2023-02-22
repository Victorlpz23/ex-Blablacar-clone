// Requiring hbs for use it below
const hbs = require('hbs');


// Method for create and use partials views 
hbs.registerPartials(`${__dirname}/../views/partials`);


// Method to know if the trip is owned by the creator 
hbs.registerHelper('isOwnedBy', (trip, user, options) => {
  if (trip.user.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});