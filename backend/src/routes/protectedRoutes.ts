import express from "express";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Protected route - accessible to all authenticated users
router.get("/dashboard", authenticateUser, (req, res) => {
  res.json({ message: `Welcome to your dashboard, user ID: ${req.user?.id}` });
});

// Admin-only route - restricted access
router.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome Admin, you have full privileges." });
});

export default router;
