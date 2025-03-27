// GET /admin/users → Fetch all users & their details.
// GET /admin/summary → Fetch user counts & recent activities.
// GET /admin/logs → Fetch system logs.
// PATCH /admin/user/:id → Update user details.
// DELETE /admin/user/:id → Delete a user if needed.

//have to make admin auth token

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser= require('../models/adminUser');
const adminToken= require('../middleware/adminAuth');
const TalentUser= require('../models/talentUser');
const ScoutUser = require('../models/scoutUser');
const CoachUser = require('../models/coachUser');


// admin data analytics
router.get('/dashboard-data', async (req, res) => {
  try {
    // Fetch all users in parallel (talents, scouts, and coaches)
    const [talents, scouts, coaches] = await Promise.all([
      TalentUser.find({}, 'role createdAt reviewsGiven talentRequirements review'),
      ScoutUser.find({}, 'role createdAt reviewsGiven talentRequirements review'),
      CoachUser.find({}, 'role createdAt reviewsGiven talentRequirements review'),
    ]);

    // Combine all user data
    const allUsers = [...talents, ...scouts, ...coaches];

    // Update roles based on conditions
    allUsers.forEach((user) => {
      if (!user.role && user.reviewsGiven) {
        user.role = 'coach'; // Assign role 'coach' if reviewsGiven is true
      } else if (!user.role && user.talentRequirements) {
        user.role = 'scout'; // Assign role 'scout' if talentRequirements is true
      } else if (!user.role && user.review) {
        user.role = 'talent'; // Assign role 'talent' if review is true
      } else {
        user.role = 'admin'; // Default role if no conditions are met
      }
    });

    // Optionally, save the updated roles to the database
    await Promise.all(allUsers.map((user) => user.save()));

    // Return the updated data to the frontend
    res.json(allUsers); // Send the updated user data for frontend processing
  } catch (error) {
    console.error('Error fetching or updating data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Register a new admin
router.post('/register', async (req, res) => {
  try {

    

    const { name, email, password,} = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await AdminUser.findOne({email})
    if(existingUser){
        return res.json({message: "user already exist"})
    }

    const adminCount = await AdminUser.countDocuments();
    if (adminCount >= 5) {
      return res.status(403).json({ message: "Maximum of 5 admins reached." });
    }
    

    const newAdmin = new AdminUser({
      name,
      email,
      password: hashedPassword,
    });

     // create new jwt token for the user
     const token = jwt.sign(
        { adminUserId: newAdmin._id, email: newAdmin.email, },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({message: 'user registered successfully', token: token, newAdminUser:newAdmin});
    

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully." });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//route to login adminUser
router.post('/login', async (req, res) => {
    try {
      console.log('from admin/login')
        const { email, password } = req.body;


        if (!email) {
            console.log('no email, ',email);
            return res.status(400).json({ message: '"email" is required' });
        }
        if (!password) {
          console.log('no password, ',password);
            return res.status(400).json({ message: '"password" is required' });
        }

        const adminUser = await AdminUser.findOne({ email });
        console.log('adminUser found in db: ',adminUser);
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", adminUser.password);
      

        if (!adminUser) {

            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, adminUser.password);
       // console.log('checking if password is valid(hashing issue): ',validPassword)
        if (!validPassword) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not set in environment variables' });
        }

       // console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

        // Generate a JWT token (FIXED ORDER)
        const token = jwt.sign(
            { id: adminUser._id,email: adminUser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );

        // Return token
        const role = "Admin";
        res.status(200).json({ 
          message: "Admin logged in successfully.", 
          token, 
          user: { ...adminUser.toObject(), role } 
      });
      
       
    } catch (error) {
        console.error("Login Error:", error); // Debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

// GET Admin Profile
router.get("/getAdminProfile", adminToken, async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ _id: req.user.id });

    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    // Check if the admin has an adminDashboard
    if (!admin.adminDashboard || Object.keys(admin.adminDashboard).length === 0) {
      return res.status(200).json({ profile: null }); // No dashboard data
    }

    res.status(200).json({ profile: admin.adminDashboard });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Admin Profile
router.get("/getAdminUser", adminToken, async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ _id: req.user.id });

    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    // Check if the admin has an adminDashboard
    if (!admin.adminDashboard || Object.keys(admin.adminDashboard).length === 0) {
      return res.status(200).json({ profile: null }); // No dashboard data
    }

    res.status(200).json({ user: admin });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/updateProfile', adminToken, async (req, res) => {
    try {
      const { phoneNumber, biography, mediaContent } = req.body;
      const adminId = req.user.id; // Extracted from JWT token
  
      const updatedAdmin = await AdminUser.findByIdAndUpdate(
        adminId,
        { adminDashboard: [{ phoneNumber, biography, mediaContent }] },
        { new: true }
      );
  
      if (!updatedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.json({ message: 'Profile updated', admin: updatedAdmin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // POST Route: Create admin Dashboard for Logged-in User
router.post("/createAdminProfile", adminToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from JWT payload
    const { phoneNumber, biography, mediaContent } = req.body;

    console.log("Request Body:", req.body);

    // Fetch the logged-in admin user
    const admin = await AdminUser.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a dashboard
    if (admin.adminDashboard.length > 0) {
      return res.status(400).json({ message: "Dashboard already exists. You can update it instead." });
    }

    // Create and add the dashboard entry
    const newDashboard = {
      phoneNumber,
      biography,
      mediaContent
    };

    admin.adminDashboard.push(newDashboard); // Add dashboard object directly
    await admin.save();

    res.status(201).json({ message: "Dashboard created successfully", dashboard: newDashboard });

  } catch (error) {
    console.error("Error creating & assigning dashboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put('/editAdminProfile', adminToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from JWT payload
    const { phoneNumber, biography, mediaContent } = req.body;

    console.log("Edit Admin Profile Req.body:", req.body);

    // Find the logged-in admin user
    const admin = await AdminUser.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the user has an existing dashboard
    if (!admin.adminDashboard || admin.adminDashboard.length === 0) {
      return res.status(400).json({ message: 'No dashboard found. Please create one first.' });
    }

    // Update the first dashboard entry
    const dashboard = admin.adminDashboard[0]; // Assuming a single dashboard entry
    dashboard.phoneNumber = phoneNumber || dashboard.phoneNumber;
    dashboard.biography = biography || dashboard.biography;
    dashboard.mediaContent = mediaContent || dashboard.mediaContent;

    // Save the updated admin document
    await admin.save();

    res.status(200).json({ message: 'Dashboard updated successfully', dashboard });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//deletes admin user's account
router.delete('/deleteAdminUser', adminToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from JWT payload

    // Find and delete the admin user
    const admin = await AdminUser.findByIdAndDelete(userId);
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Admin user deleted successfully' });

  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  module.exports = router;
