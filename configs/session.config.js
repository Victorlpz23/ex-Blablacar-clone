// Requiring express-session for creating session cookies
const session = require('express-session');

// Requiring connect-mongo to manage session cookies in the database
const MongoStore = require('connect-mongo');

// Requiring User model
const User = require('../models/user.model');

// Create a constant to connect to mongo to the database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blablacar';

module.exports.session = session ({
  secret: process.env.SESSION_SECRET || 'super secret',
  resave: false,
  saveUninitialized : false,
  cookie: { 
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true'
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 7 * 24 * 60 * 60 // = 7 days. Default
  })
});


