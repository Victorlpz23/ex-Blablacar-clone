
// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Creating a trip schema
const tripSchema = new Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  comments: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
},
  { timestamps: true }
);


// Export the model to use in the app
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

