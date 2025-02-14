import { Request, Response } from "express";
import Talent from "../models/Talent";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const talent = await Talent.findById(req.user.id);
    res.json(talent);
  } catch (error) {
    res.status(500).send("Error fetching profile");
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updatedTalent = await Talent.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedTalent);
  } catch (error) {
    res.status(500).send("Error updating profile");
  }
};
