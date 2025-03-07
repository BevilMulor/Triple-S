const mongoose = require('mongoose');

// Create user model. Note: move to user model
const coachUser =  mongoose.model('coachUser', new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    discipline:{type: String, required:true },
    reviewsGiven:[{ type: mongoose.Types.ObjectId, ref:'review'}]//ref should point to a mongoose model
}));

module.exports = coachUser;
