const mongoose = require('mongoose');
const allUsers = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ['scout', 'coach', 'talent'],
      default: 'talent', // default role
    },
    reviewsGiven: { type: Boolean, default: false },
    talentRequirements: { type: Boolean, default: false },
    review: { type: Boolean, default: false },
    // other fields...
  });

  const users = mongoose.model('All users', allUsers);
  module.exports = users;