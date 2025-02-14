import React, { useState } from "react";

const talentCategories = ["Soccer Player", "Basketball Player", "Marathoner", "Painter"];

const talentPositions: Record<string, string[]> = {
  "Soccer Player": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  "Basketball Player": ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  "Marathoner": ["Sprinter", "Middle-Distance Runner", "Long-Distance Runner", "Ultra-Marathoner"],
  "Painter": ["Portrait Painter", "Landscape Painter", "Abstract Painter", "Muralist", "Digital Artist"]
};

const TalentFilters: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <div>
      <h3>Filter Talents</h3>
      <label>Category:</label>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        {talentCategories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {selectedCategory && talentPositions[selectedCategory] && (
        <>
          <label>Position:</label>
          <select onChange={(e) => setSelectedPosition(e.target.value)}>
            <option value="">All</option>
            {talentPositions[selectedCategory].map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default TalentFilters;
