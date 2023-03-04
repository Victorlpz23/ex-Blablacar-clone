
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
    required: true,
    min: 0,
  },
  seats: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comments: {
    type: String,
    maxLength: [120, "Max length 140 chars"],
  },
  date: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  locationFrom: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number]
    },
  },
  locationTo: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number]
    },
  }
},
  { timestamps: true }
);

// Index for Google maps
tripSchema.index({ locationFrom: '2dsphere'})
tripSchema.index({ locationTo: '2dsphere'})

// Export the model to use in the app
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

