import express, { Router } from "express";
import { registerUser, loginUser, createAdmin } from "../controllers/authController";
import { protect, authorizeAdmin } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/admin").post(protect, authorizeAdmin, createAdmin);

export default router;
