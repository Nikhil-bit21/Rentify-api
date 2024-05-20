const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routes/userRoutes');
const PropertyRoutes = require('./Routes/propertyRouter');

app.use('/user' , userRoutes);
app.use('/property',PropertyRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})