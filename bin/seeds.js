
// Requiring database to create the seed
require('../configs/db.config');

// Requiring model to create the seed
const Trip = require('../models/trip.model');

// Requiring model to create the seed
const User = require('../models/user.model');

// Requiring faker to create random users
const { faker } = require('@faker-js/faker');


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
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.birthdate(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      password: `12345678`,
    })
    .then(user => {
        Trip.create({
          user: user.id,
          from: "Madrid, España",
          to: "Valencia, España",
          departureTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
          price: faker.random.numeric(2),
          date: faker.date.future(),
          seats: 3,
          comments: faker.random.words(5),
        }).then((trip) => {
          console.log(`trip ${i} created`)
        }).catch((error) => console.error(error))
      }
    ).catch((error) => console.error(error))
  }
});


