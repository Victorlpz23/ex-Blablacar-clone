
// Exports Google Maps Api Key
module.exports.googleApiKey = ((req, res, next) => {
  res.locals.googleApiKey = process.env.GOOGLE_API_KEY
  next()
});