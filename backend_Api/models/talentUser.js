//const express = require('express');
const mongoose = require('mongoose');

// Create user model. Note: move to user model
const talentUser =  mongoose.model('talentUser', new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    discipline:{type: String, required:true },
    dashboard: [{ type: mongoose.Types.ObjectId, ref: 'talentDashboard' }],
    review:[{ type: mongoose.Types.ObjectId, ref:'review'}]
    
}));

module.exports = talentUser;