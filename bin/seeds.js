
// Requiring database to create the seed
require('../configs/db.config');

// Requiring model to create the seed
const Trip = require('../models/trip.model');


// Creating the seed with the model keys
Trip.deleteMany()
.then(() => {
  for (let i = 0; i <= 10; i++) {
    Trip.create({
      user: `User ${i}`,
      from: `City from ${i}`,
      to: `City of destiny ${i}`,
      price: 30,
      date: `Date ${i}`,
      seats: 3,
      car: `Model ${i}`,
      comments: `Comment ${i}`,
    }).then((trip) => {
      console.log(`trip ${i} created`)
    }).catch((error) => console.error(error))
  }
});

