// Requiring express & use Router function 
const express = require('express');
const router = express.Router();

// You will need a constant for use actions defined inside the controller files
const commonsController = require('../controllers/commons.controller');
const tripsController= require('../controllers/trips.controller')

// Defining the actions for paht request
router.get('/', commonsController.home);

router.get('/trips', tripsController.list);
router.get('/trips/:id', tripsController.detail)









// Exports router for app.js 
module.exports = router