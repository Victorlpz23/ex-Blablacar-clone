// .env file
require('dotenv').config();

// Requiring express & app constant creation based on express framework
const express = require('express');
const app = express();

// Require hbs to views folder
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);













// Connection with localhost at port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application is running at port ${port}`));
