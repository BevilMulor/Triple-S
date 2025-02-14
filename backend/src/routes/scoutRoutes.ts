// src/routes/scoutRoutes.ts
import express from "express";
import Talent from "../models/Talent";
import { filterTalents } from "../utils/scoutFilters";

const router = express.Router();

// GET /scouts/filter-talents
router.get("/filter-talents", async (req, res) => {
  try {
    const filters = req.query;
    const allTalents = await Talent.find({});
    const filteredTalents = filterTalents(allTalents, filters);
    
    res.json(filteredTalents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching talents", error });
  }
});

export default router;
