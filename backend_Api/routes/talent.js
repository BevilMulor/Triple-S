const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const TalentDashboard = require('../models/talentDashboard'); // Import the model
const TalentUser = require('../models/talentUser'); // Import the user model
const verifyToken  = require('../middleware/auth'); // Import authentication middleware (if needed)
const coachToken = require('../middleware/coachAuth');
const scoutToken = require('../middleware/scoutAuth');
const Review = require('../models/review');



//get profile route for coach and talent
//get talent logged-in user's profile
router.get('/getOpenTalentProfile/:id', coachToken, async (req, res) => {
    try {
        const { id } = req.params; // Get the talent's ID from the request params
        console.log('talentId: ', id)
        const userRole = req.user.role; // Get the role from the verified token
        console.log('user role', userRole);
        
        
        if( id === undefined || null){
            return alert('No profile for Talent.');
        }

        if (userRole !== 'Scout' && userRole !== 'Coach') {
            // console.log('user role', userRole);
            return res.status(403).json({ message: 'Access denied. Only scouts and coaches can view talent profiles.' });
        }

        const talentDashboard = await TalentDashboard.findById(id)
            

        if (!talentDashboard) {
            console.log('from no talentUser found: ', talentDashboard)
          
            return res.status(404).json({ message: 'Talent profile not found' });
            
        }
       
        res.status(200).json({ profile: talentDashboard });

    } catch (error) {
        console.error('Error fetching talent profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//open viewable profile for scout 
router.get('/getOpenTalentProfile2/:id', scoutToken, async (req, res) => {
    try {
        const { id } = req.params; // Get the talent's ID from the request params
        console.log('talentDashboard: ', id)
        const userRole = req.user.role; // Get the role from the verified token
        console.log('user role', userRole);
        
        
        if( id === undefined || null){
            return alert('No profile for Talent.');
        }

        if (userRole !== 'Scout' && userRole !== 'Coach') {
            // console.log('user role', userRole);
            return res.status(403).json({ message: 'Access denied. Only scouts and coaches can view talent profiles.' });
        }

        const talentDashboard = await TalentDashboard.findById(id)
            

        if (!talentDashboard) {
            console.log('from no talentUser found: ', talentDashboard)
          
            return res.status(404).json({ message: 'Talent profile not found' });
            
        }
        //Find and fetch talentUser and populate talent review details
       const talentUser = await TalentUser.findOne({ dashboard: id }) // where id is the talent dashboard ID
            .populate('review') // Populate the review field
            .exec();

        if (!talentUser) {
            return res.status(404).json({ message: 'Talent user not found' });
        }

       //find coach name
       //Fetch reviews and populate coach details
       const reviewsWithCoachInfo = await Review.find({ talent: talentUser._id }) 
       .populate({
           path: 'coach',  
           populate: {
               path: 'dashboard',  // ✅ Get the coach's dashboard
               select: 'name',  // ✅ Only fetch the name from coachDashboard
           },
       })
       .exec();


        res.status(200).json({
             profile: talentDashboard,
             reviews: reviewsWithCoachInfo
            });
            console.log('talentUser: ',talentUser);

    } catch (error) {
        console.error('Error fetching talent profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//required by edit page
router.get('/getTalentProfile/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Get the talent's ID from the request params
        console.log('Fetching talent profile with ID:', id);
        
        if (!id) {
            return res.status(400).json({ message: 'No talent ID provided.' });
        }

        const talentProfile = await TalentDashboard.findById(id);
        console.log('fetched talentProfile (from param profile id route): ',talentProfile);

        if (!talentProfile) {
            console.log('No talent profile found:', id);
            return res.status(404).json({ message: 'Talent profile not found' });
        }

        // //Fetch reviews and populate talent review details
        // const talentReviews = await Review.find({ talent: id}) 
        // .populate({
        //     path: 'talent',  
        //     populate: {
        //         path: 'review',  // Get the talent's reviews
            
        //     },
        // })
        // .exec();

        res.status(200).json({
             profile: talentProfile ,
            // reviews: talentReviews
        });
        


    } catch (error) {
        console.error('Error fetching talent profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST Route: Create & Assign Talent Dashboard to Logged-in User
router.post('/createProfile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload

        const { name, phoneNumber, dateOfBirth, country, position, experience, currentClub, preferredFoot,  mediaContent } = req.body;

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

        // // Create a new dashboard
        // const newDashboard = new TalentDashboard({
        //     name,
        //     phoneNumber,
        //     dateOfBirth,
        //     country,
        //     position,
        //     experience,
        //     currentClub,
        //     preferredFoot,
        //     mediaContent
        // });
        // ✅ Ensure `preferredFoot` is handled properly
        const newDashboard = new TalentDashboard({
            name,
            phoneNumber,
            dateOfBirth,
            country,
            position,
            experience,
            currentClub,
            mediaContent
        });

        if (preferredFoot) {
            newDashboard.preferredFoot = preferredFoot; // Only set if provided
        }


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

//edit profile route
router.put('/editProfile', verifyToken, async (req,res) => {
    try {
        const userId = req.user.id; // Get logged-in user ID from JWT payload
        const { name, phoneNumber, dateOfBirth, country, position, experience, currentClub, preferredFoot, mediaContent } = req.body;

        console.log("Edit Profile Req.body:", req.body);

        // Find the logged-in user and populate dashboard
        const talentUser = await TalentUser.findById(userId).populate('dashboard').exec();

        if (!talentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the user has an existing dashboard
        if (!talentUser.dashboard || talentUser.dashboard.length === 0) {
            return res.status(400).json({ message: 'No dashboard found. Please create one first.' });
        }

        // Get the existing dashboard (assuming one dashboard per user)
        const dashboardId = talentUser.dashboard[0]._id;
        const dashboard = await TalentDashboard.findById(dashboardId);

        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found' });
        }

        // Update the dashboard fields
        dashboard.name = name || dashboard.name;
        dashboard.phoneNumber = phoneNumber || dashboard.phoneNumber;
        dashboard.dateOfBirth = dateOfBirth || dashboard.dateOfBirth;
        dashboard.country = country || dashboard.country;
        dashboard.position = position || dashboard.position;
        dashboard.experience = experience || dashboard.experience;
        dashboard.currentClub = currentClub || dashboard.currentClub;
        dashboard.preferredFoot = preferredFoot || dashboard.preferredFoot;
        dashboard.mediaContent = mediaContent || dashboard.mediaContent;

        // Save the updated dashboard
        const updatedDashboard = await dashboard.save();

        res.status(200).json({ message: 'Dashboard updated successfully', dashboard: updatedDashboard });
    } catch (error) {
        console.error('Error updating profile:', error);
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
        const talentId = req.user.id;
        console.log("talentId: ",talentId);

        // Search for the user using the email from the token
        const talentUser = await TalentUser.findOne({ email: userEmail })
            .populate('dashboard')
            .populate('review')
            .exec();
        console.log("reviews:  ",talentUser.review);
        if (!talentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has a dashboard
        if (!talentUser.dashboard || talentUser.dashboard.length === 0) {
            return res.status(404).json({ message: 'No profile found for this user' });
        }
        //trying to get coach info(name)
         //Fetch reviews and populate coach details
         const reviewsWithCoachInfo = await Review.find({ talent: talentUser._id }) 
            .populate({
                path: 'coach',  
                populate: {
                    path: 'dashboard',  // ✅ Get the coach's dashboard
                    select: 'name',  // ✅ Only fetch the name from coachDashboard
                },
            })
            .exec();

        res.status(200).json({ 
            profile: talentUser.dashboard, 
            reviews: reviewsWithCoachInfo  // ✅ Now reviews include the coach's name
        });

       // const scooutInfo=talentUser.?.scoutDashboard;
        // res.status(200).json({ profile: talentUser.dashboard, reviews: talentUser.review ,coachInfo: coachInfo});
        

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
        const talentUser = await TalentUser.findById(userId).populate('dashboard').exec();
        if (!talentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the user has a dashboard to delete
        if (!talentUser.dashboard || talentUser.dashboard.length === 0) {
            return res.status(400).json({ message: 'No profile found to delete' });
        }

        // Delete the dashboard
        const dashboardId = talentUser.dashboard[0]._id;
        await TalentDashboard.findByIdAndDelete(dashboardId);

        // Remove the dashboard reference from the user
        talentUser.dashboard = [];
        await talentUser.save();

        res.status(200).json({ message: 'Profile deleted successfully' });

    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


