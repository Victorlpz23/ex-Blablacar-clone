// Require mongoose to connect
const mongoose = require('mongoose');

// Create a constant to connect to mongo to the database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blablacar';

// Connection with the database
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info(`Application is succesfully connected to the database ${MONGODB_URI}`)
  })
  .catch((error) => console.erro(error));