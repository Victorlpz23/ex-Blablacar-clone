// // Require mongoose to create a schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Creating a rating schema
// const ratingSchema = new Schema ({
//   ownerId: {
//     type: String,
//     required: true
//   },
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//     required: true
//   },
//   observations: {
//     type: String,
//   }
// })


// ratingSchema.virtual('rating', {
//   ref: 'Rating',
//   localField: 'id',
//   foreignField: '_id',
//   justOne: false
// });


// // Export the model to use in the app
// const Rating = mongoose.model('Rating', ratingSchema);
// module.exports = Rating;