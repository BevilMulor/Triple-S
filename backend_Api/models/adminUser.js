const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUser = new mongoose.Schema({
  name: {type:String},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "Admin" },
  adminDashboard:[{
    phoneNumber: { type: String, required: true },
    biography: {type: String, required: true},
    mediaContent: [{
      fileType: { type: String, required: true, enum: ['image', 'video', 'pdf', 'other', 'image/jpeg', 'image/png', 'video/mp4', 'application/pdf']}, // Add all allowed file types here 
      fileUrl: { type: String, required: true }
    }]

  }],
  
},{ timestamps: true });

// Middleware to enforce the 5-admin limit before saving
adminUser.pre('save', async function (next) {
  const adminCount = await mongoose.model('Admin').countDocuments();
  if (adminCount >= 10) {
    const error = new Error('Maximum number of admins (10) reached.');
    return next(error);
  }
  next();
});



const Admin = mongoose.model('Admin', adminUser);
module.exports = Admin;