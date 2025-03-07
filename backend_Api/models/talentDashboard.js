const mongoose = require('mongoose');


const talentDashboard =  mongoose.model('talentDashboard', new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },//mm/dd/yy
    country: { type: String, required: true },
    position: { type: String, required: true }, 
    experience: { type: String, required: true,enum: ['Beginner','Intermediate','Advanced']}, // Years of experience
    currentClub: { type: String, required: true },
    preferredFoot: { type: String,  enum: ['Left', 'Right', 'Both'] }, 
    mediaContent: [{
        fileType: { type: String, required: true, enum: ['image', 'video', 'pdf', 'other', 'image/jpeg', 'image/png', 'video/mp4', 'application/pdf']}, // Add all allowed file types here 
        fileUrl: { type: String, required: true }
    }],// Array of media URLs (e.g., videos, images)
}, { timestamps: true }));



module.exports = talentDashboard;