const mongoose = require('mongoose');

// Create user model. Note: move to user model
const scoutUser =  mongoose.model('scoutUser', new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    discipline:{type: String, required:true },
    dashboard: [{ type: mongoose.Types.ObjectId, ref: 'scoutDashboard' }],
    talentRequirements:[{ type: mongoose.Types.ObjectId, ref:'talentRequirements'}]//ref should point to a mongoose model
}));

module.exports = scoutUser;