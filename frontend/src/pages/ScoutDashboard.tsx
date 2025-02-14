// src/pages/ScoutDashboard.tsx
import React, { useState } from "react";
import Subscription from "../components/Subscription";
import TalentFilters from "../components/TalentFilters";
import TalentList from "./TalentList";

const ScoutDashboard: React.FC = () => {
  const [filters, setFilters] = useState({ category: "", position: "" });

  return (
    <div className="scout-dashboard">
      <h1>Scout Dashboard</h1>
      <Subscription />
      <TalentFilters onFilterChange={setFilters} />
      <TalentList />
    </div>
  );
};

export default ScoutDashboard;
