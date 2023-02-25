// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ratingSchema = new Schema ({
  ownerId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  observations: {
    type: String,
  }
})
ratingSchema.virtual('rating', {
  ref: 'Rating',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: false
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;