const mongoose = require('mongoose');

// Create user model. Note: move to user model
//R=rating
const review =  mongoose.model('review', new mongoose.Schema({
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'coachUser', required: true }, // Who wrote the review
    talent: { type: mongoose.Schema.Types.ObjectId, ref: 'talentUser', required: true }, // Who received the review
    ballDistributionR: { type: Number, required: true, min: 1, max: 10 },  // Rating from 1-10\
    composureR: { type: Number, required: true, min: 1, max: 10 },  // Rating from 1-10
    dribblingR: { type: Number, required: true, min: 1, max: 10 },  // Rating from 1-10
    comment: { type: String, required: true },  // Coach's comment
    createdAt: { type: Date, default: Date.now }
    
}));

module.exports = review;
