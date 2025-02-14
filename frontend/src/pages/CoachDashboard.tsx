import React, { useEffect, useState } from "react";
import axios from "axios";
import TalentApproval from "../components/TalentApproval";

const CoachDashboard: React.FC = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    axios.get("/api/talents").then((response) => {
      setTalents(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Coach Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {talents.map((talent: any) => (
          <div key={talent._id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{talent.name}</h2>
            <p>Category: {talent.category}</p>
            <p>Position: {talent.position || "N/A"}</p>
            <p>Skills: {talent.skills.join(", ")}</p>
            <TalentApproval talentId={talent._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachDashboard;
