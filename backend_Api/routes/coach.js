const express = require('express');
const router = express.Router();
const review = require('../models/review');
const talentUser = require('../models/talentUser');
const coachUser = require('../models/coachUser');
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

module.exports = router;
