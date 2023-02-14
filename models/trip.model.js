
// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Creating a trip schema
const tripSchema = new Schema ({
  user: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  price: {
      type: Number,
      required: true
  
  },
  seats: {
    type: Number,
    required: true
  },
  car: {
    type: String,
    required: true
  },
  comments: {
    type: String,
  }
},
  { timestamps: true }
);


// Export the model to use in the app
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
