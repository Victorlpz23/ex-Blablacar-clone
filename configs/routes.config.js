// Requiring express & use Router function 
const express = require('express');
const router = express.Router();

// You will need a constant for use actions defined inside the controller files
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller');
const userController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');
const storage = require('../configs/storage.config');

// Defining the actions for paht request
router.get('/', commonsController.home);

// Trips routes
router.get('/trips', tripsController.list);
router.get('/trips/new', secure.isAuthenticated, tripsController.create);
router.post('/trips/new', secure.isAuthenticated, tripsController.doCreate);
router.get('/trips/:id', tripsController.detail);
router.get('/trips/:id/edit', secure.isAuthenticated, tripsController.update);
router.post('/trips/:id', secure.isAuthenticated, tripsController.doUpdate);
router.post('/trips/:id/delete', secure.isAuthenticated, tripsController.delete);



// Users routes
router.get('/users/new', userController.create);
router.post('/users/new', userController.doCreate);
router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), userController.list);
router.get('/profile', secure.isAuthenticated, userController.profile);
router.get('/profile/:id/edit', secure.isAuthenticated, userController.update);
router.post('/profile/:id', secure.isAuthenticated, storage.single('image'), userController.doUpdate);

// Users login routes
router.get('/login', userController.login);
router.post('/login', userController.doLogin);









// Exports router for app.js 
module.exports = router