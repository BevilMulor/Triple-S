import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/stats", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ scouts: 50, talents: 100, coaches: 20 });
});

router.get("/users", authenticateUser, authorizeAdmin, (req, res) => {
  return res.json([{ id: 1, name: "John Doe", role: "Scout" }]);
});

router.get("/payments", authenticateUser, authorizeAdmin, (req, res) => {
  res.json([{ id: "txn_12345", amount: 99.99 }]);
});

export default router;
