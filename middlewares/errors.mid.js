

// Requiring http-errors library
const createError = require('http-errors');

// Exports notFound midddleware for 404 error
module.exports.notFound = ((req, res, next) => {
  next(createError(404, 'Page not found'))
});


// Exports statusError midddleware for 500 error and create a 500 error if the error doesn`t exists
module.exports.statusError = ((error, req, res, next) => {
  error = !error.status ? createError(500, error) : error;
  console.error(error);

  res.status(error.status)
  .render(`errors/${error.status}`, { error })
});


