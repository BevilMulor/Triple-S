import mongoose from "mongoose";

const talentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Soccer Player", "Basketball Player", "Marathoner", "Painter"], 
    required: true 
  },
  position: { type: String }, // Position specific to certain categories
  skills: { type: [String], required: true },
  videoContent: { type: String },
  imageContent: { type: String },
  team: { type: String }, // Organization or team they are working with
  rating: { type: Number, default: 0 }, // To store coach ratings
});

// Mapping valid positions for each category
export const talentPositions: Record<string, string[]> = {
  "Soccer Player": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  "Basketball Player": ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  "Marathoner": ["Sprinter", "Middle-Distance Runner", "Long-Distance Runner", "Ultra-Marathoner"],
  "Painter": ["Portrait Painter", "Landscape Painter", "Abstract Painter", "Muralist", "Digital Artist"]
};

// Mapping valid skills for each category
export const talentSkills: Record<string, string[]> = {
  "Soccer Player": ["Dribbling", "Passing", "Shooting", "Defending", "Goalkeeping", "Speed", "Vision"],
  "Basketball Player": ["Dribbling", "Shooting", "Passing", "Defense", "Rebounding", "Speed", "Court Vision"],
  "Marathoner": ["Endurance", "Speed", "Stamina", "Pacing", "Mental Strength"],
  "Painter": ["Brushwork", "Color Theory", "Perspective", "Composition", "Detailing", "Creativity"]
};

const Talent = mongoose.model("Talent", talentSchema);
export default Talent;
