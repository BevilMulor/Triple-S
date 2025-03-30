require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing Mongo URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connection Successful'))
  .catch(err => console.error('MongoDB Connection Error:', err));
