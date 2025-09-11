const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyparser = require('body-parser');
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;


// Import the router files
const userRoutes = require('./routes/userRoutes');


// Use the routers
app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});