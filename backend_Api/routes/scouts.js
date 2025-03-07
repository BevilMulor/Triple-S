const express = require('express');
const router = express.Router();
const talentRequirements = require('../models/talentRequirements');
const scoutUser= require('../models/scoutUser');


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


module.exports = router;
