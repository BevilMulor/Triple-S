const express = require('express');
const router = express.Router();
const talentRequirements = require('../models/talentRequirements');
const scoutUser= require('../models/scoutUser');
const ScoutDashboard= require('../models/scoutDashboard');


const verifyToken  = require('../middleware/scoutAuth'); // Import scout authentication middleware 
// Route for a coach to submit a review for a talent user
router.post('/submitRequirements', verifyToken, async (req, res) => {

    // scout: { type: mongoose.Schema.Types.ObjectId, ref: 'scoutUser', required: true }, // Who wrote the talent requirements
    // position: { type: String, required: true }, 
    // requirements: { type: String, required: true },  // scout's additional requirements

    try {
        console.log("Route handler hit!"); // Log when this line is hit

        const { scoutId, position, requirements } = req.body;
        console.log("Request Body:", req.body); // Log incoming data

        const scout = await scoutUser.findById(scoutId);

        console.log("Found scout:", scout);
       
        if (!scout) return res.status(404).json({ message: "Scout not found" });
        
        const newTalentRequirements = new talentRequirements({
            scout: scoutId,
            position,
            requirements
        });

        await newTalentRequirements.save();
        console.log("Talent Requirements saved:", newTalentRequirements);

        scout.talentRequirements.push(newTalentRequirements._id);
        await scout.save();

        // coach.reviewsGiven.push(newReview._id);
        // await coach.save();

        res.status(201).json({ message: "Requirements submitted successfully", talentRequirements: newTalentRequirements });
    } catch (error) {
        console.error("Error occurred:", error); // Log any error
        res.status(500).json({ message: error.message });
    }
});

//get requirements
router.get('/getRequirements', async (req, res) => {
    try {
        console.log("Fetching all talent requirements...");

        // Fetch all talent requirements and populate the scout details
        const allRequirements = await talentRequirements.find().populate('scout');

        res.status(200).json({ talentRequirements: allRequirements });
    } catch (error) {
        console.error("Error fetching requirements:", error);
        res.status(500).json({ message: error.message });
    }
});


//required by edit page
router.get('/getScoutProfile/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Get the talent's ID from the request params
        console.log('Fetching scout profile with ID:', id);
        
        if (!id) {
            return res.status(400).json({ message: 'No scout ID provided.' });
        }

        const scoutProfile = await ScoutDashboard.findById(id);
        console.log('fetched scoutProfile (from param profile id route): ',scoutProfile);

        if (!scoutProfile) {
            console.log('No scout profile found:', id);
            return res.status(404).json({ message: 'Scout profile not found' });
        }

        res.status(200).json({ profile: scoutProfile });

    } catch (error) {
        console.error('Error fetching scout profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST Route: Create & Assign Scout Dashboard to Logged-in User
router.post('/createProfile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload

        const { name, phoneNumber, experience, biography, mediaContent } = req.body;

        console.log("This is the Req.body:", req.body);
        console.log(`This is the Req.body JSON: ${JSON.stringify(req.body)}`);

        
        // Fetch the logged-in user's details
        const scout = await scoutUser.findById(userId)
        .populate('dashboard')
        .exec();// Explicitly execute the query;
        

        if (!scout) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user already has a dashboard
        if (scout.dashboard.length > 0) {
            return res.status(400).json({ message: 'Dashboard already exists. You can update it instead.' });
        }

        // Create a new dashboard
        const newDashboard = new ScoutDashboard({
            name,
            phoneNumber,
            biography,
            experience,
            mediaContent
        });

        // Save dashboard
        const savedDashboard = await newDashboard.save();

        // Link the dashboard to the user
        scout.dashboard.push(savedDashboard);//(savedDashboard._id);=push full dashboard instead of id
        await scout.save();

        res.status(201).json({ message: 'Dashboard created successfully', dashboard: savedDashboard ,scout});

    } catch (error) {
        console.error('Error creating & assigning dashboard:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//edit profile route
router.put('/editProfile', verifyToken, async (req,res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload
        const { name, phoneNumber, biography, experience, mediaContent } = req.body;

        console.log("Edit Profile Req.body:", req.body);

        // Find the logged-in user and populate dashboard
        const scout = await scout.findById(userId).populate('dashboard').exec();

        if (!scout) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the user has an existing dashboard
        if (!scout.dashboard || scout.dashboard.length === 0) {
            return res.status(400).json({ message: 'No dashboard found. Please create one first.' });
        }

        // Get the existing dashboard (assuming one dashboard per user)
        const dashboardId = scout.dashboard[0]._id;
        const dashboard = await ScoutDashboard.findById(dashboardId);

        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found' });
        }

        // Update the dashboard fields
        dashboard.name = name || dashboard.name;
        dashboard.phoneNumber = phoneNumber || dashboard.phoneNumber;
        dashboard.biography = biography|| dashboard.biography;
        dashboard.experience = experience || dashboard.experience;
        dashboard.mediaContent = mediaContent || dashboard.mediaContent;

        // Save the updated dashboard
        const updatedDashboard = await dashboard.save();

        res.status(200).json({ message: 'Dashboard updated successfully', dashboard: updatedDashboard });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//get talent logged-in user's profile
router.get('/getProfile', verifyToken, async (req, res) => {
    try {
        const userEmail = req.user.email; // Get the email from the decoded token
        const scoutId = req.user.id;
        console.log("scoutId: ",scoutId);

        // Search for the user using the email from the token
        const scout = await scoutUser.findOne({ email: userEmail })
            .populate('dashboard')
            .populate('talentRequirements')
            .exec();
        console.log("talentRequirements:  ",scout.talentRequirements);
        if (!scout) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a dashboard
        if (!scout.dashboard || scout.dashboard.length === 0) {
            return res.status(404).json({ message: 'No profile found for this user' });
        }

        res.status(200).json({ profile: scout.dashboard, requirements: scout.talentRequirements });
        

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//delete profile route
router.delete('/deleteProfile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload

        console.log("Deleting profile for user ID:", userId);

        // Find the user
        const scout = await scoutUser.findById(userId).populate('dashboard').exec();
        if (!scout) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the user has a dashboard to delete
        if (!scout.dashboard || scout.dashboard.length === 0) {
            return res.status(400).json({ message: 'No profile found to delete' });
        }

        // Delete the dashboard
        const dashboardId = scout.dashboard[0]._id;
        await ScoutDashboard.findByIdAndDelete(dashboardId);

        // Remove the dashboard reference from the user
        scout.dashboard = [];
        await scout.save();

        res.status(200).json({ message: 'Profile deleted successfully' });

    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;





