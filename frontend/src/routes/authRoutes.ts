import express from "express";
import { signup, login, adminSignup } from "../controllers/authController";

const router = express.Router();

// Public routes for user authentication
router.post("/signup", signup);
router.post("/login", login);

// Admin-only route for creating admin accounts
router.post("/admin-signup", adminSignup);

export default router;
