
// Exports Google Maps Api Key
module.exports.googleApiKey = (req, res, next) => {
  res.locals.googleApiKey = process.env.GOOGLE_API_KEY
  next()
};

// Exports query parameters to the search
module.exports.query = (req, res, next) => {
  res.locals.query = req.query
  next()
};


// Exports current path to the profile and ratings
module.exports.currentPath = (req, res, next) => {
  res.locals.currentPath = req.path
  next()
};