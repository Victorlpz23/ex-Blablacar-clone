
// Middleware to know if the user is authenticated
module.exports.isAuthenticated = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}