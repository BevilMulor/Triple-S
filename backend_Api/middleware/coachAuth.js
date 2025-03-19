const jwt = require('jsonwebtoken');
const coachUser=require('../models/coachUser');

module.exports = async function(req, res, next) {
   console.log("Verifying token...");
   console.log("Authorization Header:", req.headers.authorization);
 
    if(!req.headers.authorization){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];;
    console.log('middleware token',token);
  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, no token' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log('decode' ,decoded);
      // Add the decoded user information to the request object
      const user = await coachUser.findById(decoded.id);
      if(!user){
      return res.status(400).json({ message: 'User does not exist' });
  
      }
      req.user = user;
      user.role='Coach';
      console.log('from middleware user: ',user)
       // Attach user details to req.user
       
    console.log("User Role in Middleware:", req.user.role);
  
  
      // Call the next middleware function
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
};