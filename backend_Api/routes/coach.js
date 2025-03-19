const express = require('express');
const router = express.Router();
const review = require('../models/review');
const talentUser = require('../models/talentUser');
const coachUser = require('../models/coachUser');
const CoachDashboard = require('../models/coachDashboard');
const verifyToken  = require('../middleware/coachAuth'); // Import authentication middleware (if nee
// Route for a coach to submit a review for a talent user
router.post('/submitReview', verifyToken, async (req, res) => {

    try {
        console.log("Route handler hit!"); // Log when this line is hit

        const { coachId, talentUserId, ballDistributionR, composureR, dribblingR, comment } = req.body;
        console.log("Request Body:", req.body); // Log incoming data
        console.log('coachId: ',coachId);
        console.log('talentId: ',talentUserId);
        const coach = await coachUser.findById(coachId);
        const talent = await talentUser.findById(talentUserId);

        console.log("Found coach:", coach);
        console.log("Found talent:", talent);

        if (!coach) return res.status(404).json({ message: "Coach not found" });
        if (!talent) return res.status(404).json({ message: "Talent user not found" });

        const newReview = new review({
            coach: coachId,
            talent: talentUserId,
            ballDistributionR,
            composureR,
            dribblingR,
            comment
        });

        await newReview.save();
        console.log("Review saved:", newReview);

        talent.review.push(newReview._id);
        await talent.save();

        coach.reviewsGiven.push(newReview._id);
        await coach.save();

        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        console.error("Error occurred:", error); // Log any error
        res.status(500).json({ message: error.message });
    }
});

//case: looking for talent first
router.post('/submitReview2', verifyToken, async (req, res) => {
    try {
      const { coachId, talentUserId, ballDistributionR, composureR, dribblingR, comment } = req.body;
  
      // Find the talent user by the talent ID (which you have in `talentUserId`)
      const talent = await talentUser.findById(talentUserId).exec();
  
      if (!talent) {
        return res.status(404).json({ message: 'Talent not found' });
      }
  
      // Find the coach by coachId (this step was missing)
      const coach = await coachUser.findById(coachId).exec();
      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
  
      // Create a new review document
      const newReview = new review({
        coach: coachId,
        talent: talentUserId,
        ballDistributionR,
        composureR,
        dribblingR,
        comment,
        createdAt: new Date(),
      });
  
      // Save the review
      await newReview.save();
  
      // Push the review to the talent's review field
      talent.review.push(newReview._id);
      await talent.save();
      console.log('talent: ',talent)
  
      // Push the review to the coach's reviewsGiven field
      coach.reviewsGiven.push(newReview._id);
      await coach.save();
  
      res.status(201).json({ message: 'Review submitted successfully', review: newReview });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ message: 'Error submitting review' });
    }
  });
  


  //fetch CoachUser by dashboard ID
router.get('/getTalentByDashboardId/:dashboardId', verifyToken, async (req, res) => {
  try {
    const { dashboardId } = req.params;

    // Find the talent user with the provided dashboard ID
    const talent = await talentUser.findOne({ 'dashboard': dashboardId }).exec();

    if (!talent) {
      return res.status(404).json({ message: 'Talent not found for the provided dashboard ID' });
    }

    res.status(200).json(talent);  // Return the full TalentUser object
  } catch (error) {
    console.error('Error fetching talent by dashboard ID:', error);
    res.status(500).json({ message: 'Error fetching talent' });
  }
});

//required by edit page
router.get('/getCoachProfile/:id', verifyToken, async (req, res) => {
  try {
      const { id } = req.params; // Get the talent's ID from the request params
      console.log('Fetching coach profile with ID:', id);
      
      if (!id) {
          return res.status(400).json({ message: 'No coach ID provided.' });
      }

      const coachProfile = await CoachDashboard.findById(id);
      console.log('fetched coachProfile (from param profile id route): ',coachProfile);

      if (!coachProfile) {
          console.log('No coach profile found:', id);
          return res.status(404).json({ message: 'Coach profile not found' });
      }

      res.status(200).json({ profile: coachProfile });

  } catch (error) {
      console.error('Error fetching coach profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// POST Route: Create & Assign Coach Dashboard to Logged-in User
router.post('/createProfile', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id; // Get logged-in user ID from JWT payload

      const { name, phoneNumber, experience, biography, mediaContent } = req.body;

      console.log("This is the Req.body:", req.body);
      console.log(`This is the Req.body JSON: ${JSON.stringify(req.body)}`);

      
      // Fetch the logged-in user's details
      const coach = await coachUser.findById(userId)
      .populate('dashboard')
      .exec();// Explicitly execute the query;
      

      if (!coach) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user already has a dashboard
      if (coach.dashboard.length > 0) {
          return res.status(400).json({ message: 'Dashboard already exists. You can update it instead.' });
      }

      // Create a new dashboard
      const newDashboard = new CoachDashboard({
          name,
          phoneNumber,
          biography,
          experience,
          mediaContent
      });

      // Save dashboard
      const savedDashboard = await newDashboard.save();

      // Link the dashboard to the user
      coach.dashboard.push(savedDashboard);//(savedDashboard._id);=push full dashboard instead of id
      await coach.save();

      res.status(201).json({ message: 'Dashboard created successfully', dashboard: savedDashboard ,coach});

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
      const coach = await coachUser.findById(userId).populate('dashboard').exec();

      if (!coach) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Ensure the user has an existing dashboard
      if (!coach.dashboard || coach.dashboard.length === 0) {
          return res.status(400).json({ message: 'No dashboard found. Please create one first.' });
      }

      // Get the existing dashboard (assuming one dashboard per user)
      const dashboardId = coach.dashboard[0]._id;
      const dashboard = await CoachDashboard.findById(dashboardId);

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



//get coach logged-in user's profile
router.get('/getProfile', verifyToken, async (req, res) => {
  try {
      const userEmail = req.user.email; // Get the email from the decoded token
      const coachId = req.user.id;
      console.log("coachId: ",coachId);

      // Search for the user using the email from the token
      const coach = await coachUser.findOne({ email: userEmail })
          .populate('dashboard')
          .populate('reviewsGiven')
          .exec();
      console.log("reviewsGiven:  ",coach.reviewsGiven);
      if (!coach) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user has a dashboard
      if (!coach.dashboard || coach.dashboard.length === 0) {
          return res.status(404).json({ message: 'No profile found for this user' });
      }
      //find talent name
       //Fetch reviews and populate coach details
       const reviewedTalent = await review.find({ coach: coach._id }) 
       .populate({
           path: 'talent',  
           populate: {
               path: 'dashboard',  // ✅ Get the coach's dashboard
               select: 'name',  // ✅ Only fetch the name from coachDashboard
           },
       })
       .exec();
       console.log('reviewed talent: ',reviewedTalent);

      res.status(200).json({ profile: coach.dashboard, reviews: coach.reviewsGiven , reviewedTalent: reviewedTalent});
      

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
      const coach = await coachUser.findById(userId).populate('dashboard').exec();
      if (!coach) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Ensure the user has a dashboard to delete
      if (!coach.dashboard || coach.dashboard.length === 0) {
          return res.status(400).json({ message: 'No profile found to delete' });
      }

      // Delete the dashboard
      const dashboardId = coach.dashboard[0]._id;
      await CoachDashboard.findByIdAndDelete(dashboardId);

      // Remove the dashboard reference from the user
      coach.dashboard = [];
      await coach.save();

      res.status(200).json({ message: 'Profile deleted successfully' });

  } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;