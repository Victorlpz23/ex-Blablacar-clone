// .env file
require('dotenv').config();

// Requiring mongo to connect de database
require('./configs/db.config');

// Requiring express & app constant creation based on express framework
const express = require('express');
const app = express();

// Requiring Morgan 
const logger = require('morgan');

// Requiring express-session 
const { session, loadSessionUser } = require('./configs/session.config');

// Using this method to be able to save inputs in req.body
app.use(express.urlencoded());

// Using Morgan to show al the http request in terminal
app.use(logger('dev'));

// Using express-session to create a cookie session 
app.use(session);
app.use(loadSessionUser);

// Requiring hbs config
require('./configs/hbs.config');

// Configure hbs as view engine
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Static files set up
app.use(express.static(`${__dirname}/public`));



// Lines for be able to use routes file to every http request
const routes = require('./configs/routes.config');
app.use(routes);









// Connection with localhost at port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application is running at port ${port}`));
