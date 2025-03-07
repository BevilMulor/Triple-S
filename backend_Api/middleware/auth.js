const jwt = require('jsonwebtoken');
const talentUser=require('../models/talentUser');

module.exports = async function(req, res, next) {
   console.log("Verifying token...");
 
    if(!req.headers.authorization){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    console.log('token: ',token);
    console.log(req.body);

  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded: ',decoded);
      // console.log(decoded);
      // Add the decoded user information to the request object
      const user = await talentUser.findById(decoded.id);
      if(!user){
      return res.status(400).json({ message: 'User does not exist' });
  
      }
      req.user = user;
  
  
      // Call the next middleware function
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
};