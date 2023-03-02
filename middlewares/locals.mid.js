
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