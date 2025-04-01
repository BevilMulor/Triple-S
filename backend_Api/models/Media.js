const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    mediaContent: [{
        fileType: {
            type: String,
            required: true,
            enum: ['image', 'video', 'pdf', 'other', 'image/jpeg', 'image/png', 'video/mp4', 'application/pdf']
        },
        fileUrl: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    }],
    //to enable fetching by user
    uploadedBy: {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'uploadedBy.userType' },
        userType: { 
            type: String, 
            required: true, 
            enum: ['Coach', 'Talent', 'Scout', 'Admin']
        }
    }
});

module.exports = mongoose.model('Media', mediaSchema);