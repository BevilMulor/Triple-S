const mongoose = require('mongoose');

// Create user model. Note: move to user model
const talentRequirements =  mongoose.model('talentRequirements', new mongoose.Schema({
    scout: { type: mongoose.Schema.Types.ObjectId, ref: 'scoutUser', required: true }, // Who wrote the talent requirements
    position: { type: String, required: true }, 
    requirements: { type: String, required: true },  // scout's additional requirements
}));

module.exports = talentRequirements;
