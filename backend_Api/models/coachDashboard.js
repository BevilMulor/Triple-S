const mongoose = require('mongoose');


const coachDashboard =  mongoose.model('coachDashboard', new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    biography: {type: String, required: true},
    experience: { type: String, required: true,enum: ['Beginner','Intermediate','Advanced']}, // Years of experience
    mediaContent: [{
        fileType: { type: String, required: true, enum: ['image', 'video', 'pdf', 'other', 'image/jpeg', 'image/png', 'video/mp4', 'application/pdf']}, // Add all allowed file types here 
        fileUrl: { type: String, required: true }
    }],// Array of media URLs (e.g., videos, images)
}, { timestamps: true }));




module.exports = coachDashboard;