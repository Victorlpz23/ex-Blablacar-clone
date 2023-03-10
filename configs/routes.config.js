// Requiring express & use Router function 
const express = require('express');
const router = express.Router();

// You will need a constant for use actions defined inside the controller files
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller');
const userController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');
const storage = require('../configs/storage.config');
const ratingController = require('../controllers/ratings.controller');
const messageController = require('../controllers/messages.controller');

// Defining the actions for paht request
router.get('/', commonsController.home);

// Trips routes
router.get('/trips', tripsController.list);
router.get('/trips/new', secure.isAuthenticated, tripsController.create);
router.post('/trips/new', secure.isAuthenticated, tripsController.doCreate);
router.get('/trips/all', secure.isAuthenticated, secure.checkRole('admin'), tripsController.all);
router.get('/trips/finder', secure.isAuthenticated, tripsController.finder);
router.get('/trips/:id', secure.isAuthenticated, tripsController.detail);
router.get('/trips/:id/edit', secure.isAuthenticated, tripsController.update);
router.post('/trips/:id', secure.isAuthenticated, tripsController.doUpdate);
router.post('/trips/:id/delete', secure.isAuthenticated, tripsController.delete);
router.get('/trips/:id/book', secure.isAuthenticated, tripsController.book);
router.post('/trips/:id/book', secure.isAuthenticated, tripsController.doBook);





// Users routes
router.get('/users/new', userController.create);
router.post('/users/new', userController.doCreate);
router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), userController.list);
router.get('/profile', secure.isAuthenticated, userController.profile);
router.get('/profile/:id/edit', secure.isAuthenticated, userController.update);
router.post('/profile/:id', secure.isAuthenticated, userController.doUpdate);
router.get('/profile/:id/edit/picture', secure.isAuthenticated, userController.picture);
router.post('/profile/image/:id', secure.isAuthenticated, storage.single('image'), userController.doPicture);
router.get('/profile/rides', secure.isAuthenticated, userController.rides);
router.get('/profile/ratings', secure.isAuthenticated, userController.ratings);


// Users login/logout routes
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/logout', secure.isAuthenticated, userController.logout);

// Ratings routes
router.get('/users/:id/rating', secure.isAuthenticated, ratingController.rate);
router.post('/users/:id/rating', secure.isAuthenticated, ratingController.doRate);

// Message routes
router.get('/users/:id/chat', secure.isAuthenticated, messageController.list);
router.post('/users/:id/chat', secure.isAuthenticated, messageController.doCreate);
router.get('/inbox', secure.isAuthenticated, messageController.inbox)



// Exports router for app.js 
module.exports = router