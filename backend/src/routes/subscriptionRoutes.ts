import express from "express";
import { createCheckoutSession } from "../controllers/subscriptionController";
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;
