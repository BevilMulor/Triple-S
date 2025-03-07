const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const TalentDashboard = require('../models/talentDashboard'); // Import the model
const TalentUser = require('../models/talentUser'); // Import the user model
const verifyToken  = require('../middleware/auth'); // Import authentication middleware (if needed)



// POST Route: Create & Assign Talent Dashboard to Logged-in User
router.post('/createProfile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload

        const { name, phoneNumber, dateOfBirth, country, position, experience, currentClub, preferredFoot, mediaContent } = req.body;

        console.log("This is the Req.body:", req.body);
        console.log(`This is the Req.body JSON: ${JSON.stringify(req.body)}`);

        
        // Fetch the logged-in user's details
        const talentUser = await TalentUser.findById(userId)
        .populate('dashboard')
        .exec();// Explicitly execute the query;
        

        if (!talentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user already has a dashboard
        if (talentUser.dashboard.length > 0) {
            return res.status(400).json({ message: 'Dashboard already exists. You can update it instead.' });
        }

        // Create a new dashboard
        const newDashboard = new TalentDashboard({
            name,
            phoneNumber,
            dateOfBirth,
            country,
            position,
            experience,
            currentClub,
            preferredFoot,
            mediaContent
        });

        // Save dashboard
        const savedDashboard = await newDashboard.save();

        // Link the dashboard to the user
        talentUser.dashboard.push(savedDashboard);//(savedDashboard._id);=push full dashboard instead of id
        await talentUser.save();

        res.status(201).json({ message: 'Dashboard created successfully', dashboard: savedDashboard ,talentUser});

    } catch (error) {
        console.error('Error creating & assigning dashboard:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//get Talents route
// GET Route for fetching all talents

router.get('/getTalents', async (req, res) => {
    try {
      // Fetch all talent users and populate the 'dashboard' and 'review' fields
      const talents = await TalentUser.find()
        .populate('dashboard')  // Populate the talent dashboard info
        .populate('review');    // Populate the review info
  
      // Send the fetched talents as the response
      res.json(talents);
    } catch (err) {
      console.error('Error fetching talents:', err);
      res.status(500).json({ message: 'Server error while fetching talents' });
    }
});

//get talent logged-in user's profile
router.get('/getProfile', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email; // Get the email from the decoded token

        // Search for the user using the email from the token
        const talentUser = await TalentUser.findOne({ email: userEmail })
            .populate('dashboard')
            .exec();

        if (!talentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a dashboard
        if (!talentUser.dashboard || talentUser.dashboard.length === 0) {
            return res.status(404).json({ message: 'No profile found for this user' });
        }

        res.status(200).json({ profile: talentUser.dashboard });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
