
// Middleware to know if the user is authenticated
module.exports.isAuthenticated = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

// Middleware to know the role of the user
module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if(req.user?.role === 'admin') {
      next()
    } else {
      res.redirect('/login')
    }
  }
}