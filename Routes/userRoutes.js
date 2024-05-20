const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body 

        // Check if there is already an admin user
        const adminUser = await User.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        // console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {email, password} = req.body;

        // Check if aadharCardNumber or password is missing
        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }

        // Find the user by aadharCardNumber
        const user = await User.findOne({email: email});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid email or Password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
// router.get('/profile', jwtAuthMiddleware, async (req, res) => {
//     try{
//         const userData = req.user;
//         const userId = userData.id;
//         const user = await User.findById(userId);
//         res.status(200).json({user});
//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.id; // Extract the id from the token
//         const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

//         // Check if currentPassword and newPassword are present in the request body
//         if (!currentPassword || !newPassword) {
//             return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
//         }

//         // Find the user by userID
//         const user = await User.findById(userId);

//         // If user does not exist or password does not match, return error
//         if (!user || !(await user.comparePassword(currentPassword))) {
//             return res.status(401).json({ error: 'Invalid current password' });
//         }

//         // Update the user's password
//         user.password = newPassword;
//         await user.save();

//         console.log('password updated');
//         res.status(200).json({ message: 'Password updated' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router;