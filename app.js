// .env file
require('dotenv').config()

// Require express
const express = require('express');
const app = express();














// Connection with localhost at port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application is running at port ${port}`));
