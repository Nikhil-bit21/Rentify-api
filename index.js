const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routes/userRoutes');
const PropertyRoutes = require('./Routes/propertyRouter');

app.get('/', async (req,res)=>{
    try {

        res.status(200).json({ message: `Find all the endpoint details at https://github.com/Nikhil-bit21/Rentify-api` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.use('/user' , userRoutes);
app.use('/property',PropertyRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})