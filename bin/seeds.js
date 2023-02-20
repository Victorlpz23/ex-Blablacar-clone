
// Requiring database to create the seed
require('../configs/db.config');

// Requiring model to create the seed
const Trip = require('../models/trip.model');

// Requiring model to create the seed
const User = require('../models/user.model');


// Deleting trips before create a new seed
Trip.deleteMany()
  .then(() => {
    console.log('trips delete')
  }).catch((error) => console.error(error));


// Creating the seed with the User & trip
User.deleteMany()
.then(() => {
  for (let i = 0; i <= 10; i++) {
    User.create({
      user: `user${i}`,
      name: `name${i}`,
      lastName: `Last name${i}`,
      birthdate: 13/03/1985,
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


