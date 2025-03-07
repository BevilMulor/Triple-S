//Auth
//REGISTRATION
 
//talentUser
require('dotenv').config();//install dotenv
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');//install bcrypt
const jwt = require('jsonwebtoken');//install jwt
var router = express.Router();
const talentUser= require('../models/talentUser');
const coachUser = require('../models/coachUser');
const scoutUser = require('../models/scoutUser');


//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("error connecting to the db", err))



// route to register talentUser
router.post('/talentRegister', async (req, res) =>{
    try{
    const { email, password, discipline } = req.body;
    // check if the user exist
    const existingUser = await talentUser.findOne({email})
    if(existingUser){
        return res.json({message: "user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // create new user
    const newUser = await talentUser.create({ email, password: hashedPassword, discipline})
    // create new jwt token for the user
    // const token = jwt.sign(
    //     {talentUserId: talentUser._id, email: talentUser.email, discipline: talentUser.discipline},
    //     process.env.JWT_SECRET,
    //     {expiresIn: '1h'}
    // )

     // create new jwt token for the user
    const token = jwt.sign(
        { talentUserId: newUser._id, email: newUser.email, discipline: newUser.discipline },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({message: 'user registered successfully', token: token, newUser:newUser});
    
    } catch (error){
        return res.status(500).json(error.message);
    }
});

//route to login talentUser
router.post('/talentLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: '"email" is required' });
        }
        if (!password) {
            return res.status(400).json({ message: '"password" is required' });
        }

        // Find the user by email and populate dashboard
        // dashboard field only contains an array of ObjectId references instead of the full data 
        // like in the registration response. This happens because MongoDB stores references
        //  but doesn't automatically populate them when you retrieve the user.
        // const talentuser = await talentUser.findOne({ email })
        // .populate('review')
        // .populate('dashboard')//dashboard field only contains an array of ObjectId references instead of the full data hence do it manually
        // .exec();// Explicitly execute the query;

        // const talentuser = await talentUser.findOne({ email });
        // if (talentuser && talentuser.review && talentuser.review.length > 0) {
        //     await talentuser.populate('review').exec();
        // } else {
        //     // Handle the case when there are no talentRequirements (e.g., send an empty array)
        //     talentuser.review = [];
        // }
        // if (talentuser && talentuser.dashboard && talentuser.dashboard.length > 0) {
        //     await talentuser.populate('dashboard').exec();
        // } else {
        //     // Handle the case when there are no talentRequirements (e.g., send an empty array)
        //     talentuser.dashboard = [];
        // }

        const talentuser = await talentUser.findOne({ email });

        if (talentuser) {
            if (talentuser.review?.length > 0) {
                await talentuser.populate({ path: 'review', options: { strictPopulate: false } });
            } else {
                talentuser.review = [];
            }

            if (talentuser.dashboard?.length > 0) {
                await talentuser.populate({ path: 'dashboard', options: { strictPopulate: false } });
            } else {
                talentuser.dashboard = [];
            }
        }

        



        if (!talentuser) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, talentuser.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not set in environment variables' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

        // Generate a JWT token (FIXED ORDER)
        const token = jwt.sign(
            { id: talentuser._id,email: talentuser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );
        

        // Return token
        const role = "Talent";
        res.status(200).json({ token, user: { ...talentuser.toObject(), role } });
        //res.status(200).json({ token ,talentuser:talentuser});

    } catch (error) {
        console.error("Login Error:", error); // Debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

// route to register coachUser
router.post('/coachRegister', async (req, res) =>{
    try{
    const { email, password, discipline } = req.body;
    // check if the user exist
    const existingUser = await coachUser.findOne({email})
    if(existingUser){
        return res.json({message: "user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // create new user
    const newUser = await coachUser.create({ email, password: hashedPassword, discipline})
   

     // create new jwt token for the user
    const token = jwt.sign(
        { coachUserId: newUser._id, email: newUser.email, discipline: newUser.discipline },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({message: 'user registered successfully', token: token, newUser:newUser});
    
    } catch (error){
        return res.status(500).json(error.message);
    }
});
//route to login talentUser
router.post('/coachLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: '"email" is required' });
        }
        if (!password) {
            return res.status(400).json({ message: '"password" is required' });
        }

        // Find the user by email and populate dashboard
        // dashboard field only contains an array of ObjectId references instead of the full data 
        // like in the registration response. This happens because MongoDB stores references
        //  but doesn't automatically populate them when you retrieve the user.

        

        // const coachuser = await coachUser.findOne({ email });
        // if (coachuser && coachuser.reviewsGiven && coachuser.reviewsGiven.length > 0) {
        //     await coachuser.populate('reviewsGiven').exec();
        // } else {
        //     // Handle the case when there are no talentRequirements (e.g., send an empty array)
        //     coachuser.reviewsGiven = [];
        // }


        const coachuser = await coachUser.findOne({ email });
        if (!coachuser) {
            return res.status(404).json({ message: "Coach user not found" });
        }
        // Populate the reviewsGiven safely
        await coachuser.populate({ path: 'reviewsGiven', options: { strictPopulate: false } });
        // Ensure it's always an array
        if (!coachuser.reviewsGiven) {
            coachuser.reviewsGiven = [];
        }


        if (!coachuser) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, coachuser.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not set in environment variables' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

        // Generate a JWT token (FIXED ORDER)
        const token = jwt.sign(
            { id: coachuser._id,email: coachuser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );

        // Return token
        const role = "Coach";
        res.status(200).json({ token, user: { ...coachuser.toObject(), role } });
        //res.status(200).json({ token ,coachuser:coachuser});

    } catch (error) {
        console.error("Login Error:", error); // Debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});


// route to register scoutUser
router.post('/scoutRegister', async (req, res) =>{
    try{
    const { email, password, discipline } = req.body;
    // check if the user exist
    const existingUser = await scoutUser.findOne({email})
    if(existingUser){
        return res.json({message: "user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // create new user
    const newUser = await scoutUser.create({ email, password: hashedPassword, discipline})
    
    const token = jwt.sign(
        { scoutUserId: newUser._id, email: newUser.email, discipline: newUser.discipline },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({message: 'user registered successfully', token: token, newUser:newUser});
    
    } catch (error){
        return res.status(500).json(error.message);
    }
});

//route to login scoutUser
router.post('/scoutLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: '"email" is required' });
        }
        if (!password) {
            return res.status(400).json({ message: '"password" is required' });
        }

        // Find the user by email and populate dashboard
        // dashboard field only contains an array of ObjectId references instead of the full data 
        // like in the registration response. This happens because MongoDB stores references
        //  but doesn't automatically populate them when you retrieve the user.


        // const scoutuser = await scoutUser.findOne({ email })
        // .populate('talentRequirements');//talentRequirements field only contains an array of ObjectId references instead of the full data hence do it manually
        // //.exec();// Explicitly execute the query;

        // const scoutuser = await scoutUser.findOne({ email });
        // if (scoutuser && scoutuser.talentRequirements && scoutuser.talentRequirements.length > 0) {
        //     await scoutuser.populate('talentRequirements')
        //     .exec();
        // } else {
        //     // Handle the case when there are no talentRequirements (e.g., send an empty array)
        //     scoutuser.talentRequirements = [];
        // }


        // if (!scoutuser) {
        //     return res.status(401).json({ message: 'Email or password is incorrect' });
        // }

        const scoutuser = await scoutUser.findOne({ email });

        if (!scoutuser) {
            return res.status(404).json({ message: "Scout user not found" });
        }

        // Populate the talentRequirements safely
        await scoutuser.populate({ path: 'talentRequirements', options: { strictPopulate: false } });

        // Ensure it's always an array
        if (!scoutuser.talentRequirements) {
            scoutuser.talentRequirements = [];
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, scoutuser.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not set in environment variables' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

        // Generate a JWT token (FIXED ORDER)
        const token = jwt.sign(
            { id: scoutuser._id,email: scoutuser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );

        // Return token
        const role = "Scout"; // Assign role based on login route
        res.status(200).json({ token, user: { ...scoutuser.toObject(), role } });
        //res.status(200).json({ token ,scoutuser:scoutuser});

    } catch (error) {
        console.error("Login Error:", error); // Debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
