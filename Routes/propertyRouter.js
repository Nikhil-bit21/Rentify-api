const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('./../jwt');
const Property = require('../models/property');
const User = require('./../models/user')

const checkAdminRole = async (userID) => {
    try{
        const user = await User.findById(userID);
        if(user.role === 'Admin'){
            return true;
        }
    }catch(err){
        return false;
    }
}

// POST route to add a candidate
router.post('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'user does not have admin role'});

        const data = req.body // Assuming the request body contains the candidate data

        data.seller_id = {
            user: req.user.id,
            Listed_At: new Date() // Alternatively, you can let the default value handle this
        };

        // Create a new User document using the Mongoose model
        const newProperty = new Property(data);

        // Save the new user to the database
        const response = await newProperty.save();
        console.log('data saved');
        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:propertyID', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user does not have admin role'});
        
        const PropertyID = req.params.propertyID; // Extract the id from the URL parameter
        const updatedPropertyData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndUpdate(PropertyID, updatedPropertyData , {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Property not found' });
        }

        console.log('Property data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:propertyID', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user does not have admin role'});
        
        const propertyID = req.params.propertyID; // Extract the id from the URL parameter

        const response = await Property.findByIdAndDelete(propertyID);

        if (!response) {
            return res.status(404).json({ error: 'Property not found' });
        }

        console.log('Property deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:propertyID', jwtAuthMiddleware, async (req, res)=>{
    
    const PropertyID = req.params.propertyID;
    const userId = req.user.id;

    try{
        
        const property = await Property.findById(PropertyID);
        if(!property){
            return res.status(404).json({ message: 'Property not found' });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }
        if(user.role == 'admin'){
            return res.status(403).json({ message: 'admin is not allowed'});
        }
        return res.status(200).json({property : property });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/', async (req, res) => {
    try {
        const property = await Property.find({});

        res.status(200).json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;