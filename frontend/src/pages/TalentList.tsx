// src/pages/TalentList.tsx
import React, { useEffect, useState } from "react";
import { Talent } from "../types/Talent"; // Assuming we have a shared Talent type
import { fetchTalents } from "../utils/api"; // Function to get talents from backend

const TalentList: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);

  useEffect(() => {
    fetchTalents().then((data) => setTalents(data));
  }, []);

  return (
    <div className="talent-list">
      <h2>Talent Profiles</h2>
      {talents.map((talent) => (
        <div key={talent.id} className="talent-card">
          <img src={talent.imageContent} alt={talent.name} />
          <h3>{talent.name}</h3>
          <p>Category: {talent.category}</p>
          {talent.position && <p>Position: {talent.position}</p>}
          <p>Skills: {talent.skills.join(", ")}</p>
          <p>Team: {talent.team || "N/A"}</p>
          <p>Rating: {talent.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default TalentList;
