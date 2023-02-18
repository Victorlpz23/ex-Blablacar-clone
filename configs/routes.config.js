// Requiring express & use Router function 
const express = require('express');
const router = express.Router();

// You will need a constant for use actions defined inside the controller files
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller');
const userController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

// Defining the actions for paht request
router.get('/', commonsController.home);

// Trips routes
router.get('/trips', tripsController.list);
router.get('/trips/new', secure.isAuthenticated, tripsController.create);
router.post('/trips/new', secure.isAuthenticated, tripsController.doCreate);
router.get('/trips/:id', tripsController.detail);

// Users routes
router.get('/users/new', userController.create);
router.post('/users/new', userController.doCreate);
router.get('/users', secure.isAuthenticated, secure.checkRole('admin'), userController.list);

// Users login routes
router.get('/login', userController.login);
router.post('/login', userController.doLogin);









// Exports router for app.js 
module.exports = router