import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<{ scouts: number; talents: number; coaches: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/admin/stats")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {stats ? (
        <ul>
          <li>Total Scouts: {stats.scouts}</li>
          <li>Total Talents: {stats.talents}</li>
          <li>Total Coaches: {stats.coaches}</li>
        </ul>
      ) : (<p>Loading statistics...</p>)}
    </div>
  );
};
export default AdminDashboard;
