
// Requiring database to create the seed
require('../configs/db.config');

// Requiring model to create the seed
const Trip = require('../models/trip.model');

// Requiring model to create the seed
const User = require('../models/user.model');


// Creating the seed with the User & trip
User.deleteMany()
.then(() => {
  for (let i = 0; i <= 10; i++) {
    User.create({
      user: `name${i}`,
      email: `email${i}@seeds.com`,
      password: `12345678`,
    })
    .then(user => {
        Trip.create({
          user: user.id,
          from: `City from ${i}`,
          to: `City of destiny ${i}`,
          price: 30,
          date: `Date ${i}`,
          seats: 3,
          comments: `Comment ${i}`,
        }).then((trip) => {
          console.log(`trip ${i} created`)
        }).catch((error) => console.error(error))
      }
    ).catch((error) => console.error(error))
  }
});


