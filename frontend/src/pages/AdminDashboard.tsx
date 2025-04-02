import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/realAuthContext';
import { BsSpeedometer2, BsPeople, BsTrophy, BsBinoculars, BsPerson, BsBell, BsArrowLeft } from 'react-icons/bs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApiUrl } from '../apiurl/ApiContext';
import { Link } from 'react-router-dom';

// Define types for our data
interface User {
  createdAt: string;
  name?: string; // Ensure name property exists
  reviewsGiven?: any;
  talentRequirements?: any;
  review?: any;
  role?: string;
}

interface RegistrationTrend {
  day: string;
  registrations: number;
}

interface RoleRegistrationTrends {
  talent: string[];
  scout: string[];
  coach: string[];
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const apiUrl = useApiUrl(); // Get the API URL from context

  useEffect(() => {
    console.log('apiUrl:', apiUrl); // Log the API URL to check if it's correct
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard-data`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dashboardData) {
    return <p>No data found.</p>;
  }

  // Initialize counters
  let totalTalents = 0;
  let totalScouts = 0;
  let totalCoaches = 0;

  // Create an array of registration trends for each role
  const roleRegistrationTrends: RoleRegistrationTrends = {
    talent: [],
    scout: [],
    coach: [],
  };

  // Group users by role and by registration day
  dashboardData.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const day = createdAt.getDate().toString().padStart(2, '0'); // Get the day of the month (01-31)
    const month = (createdAt.getMonth() + 1).toString().padStart(2, '0'); // Get the month (01-12)
    const year = createdAt.getFullYear(); // Get the year
    const dayFormatted = `${day}-${month}-${year}`; // Format as "DD-MM-YYYY"
    
    if (user.reviewsGiven) {
      user.role = 'coach';
      totalCoaches += 1;
      roleRegistrationTrends.coach.push(dayFormatted);
    } else if (user.talentRequirements) {
      user.role = 'scout';
      totalScouts += 1;
      roleRegistrationTrends.scout.push(dayFormatted);
    } else if (user.review) {
      user.role = 'talent';
      totalTalents += 1;
      roleRegistrationTrends.talent.push(dayFormatted);
    } else {
      user.role = 'talent';
      totalTalents += 1;
      roleRegistrationTrends.talent.push(dayFormatted);
    }
  });

  // Function to calculate daily registrations
  const getDailyRegistrations = (role: keyof RoleRegistrationTrends): RegistrationTrend[] => {
    const registrations = roleRegistrationTrends[role];
    const trend: RegistrationTrend[] = [];
    const uniqueDays = Array.from(new Set(registrations)); // Get unique days

    uniqueDays.forEach((day) => {
      const count = registrations.filter((date) => date === day).length;
      trend.push({ day, registrations: count });
    });

    // Sort by day (optional, depending on how your data is formatted)
    return trend.sort((a, b) => {
      const [dayA, monthA, yearA] = a.day.split('-').map(Number);
      const [dayB, monthB, yearB] = b.day.split('-').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA); 
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });
  };

  // Calculate registration trends based on the role data
  const talentRegistrationTrend = getDailyRegistrations('talent');
  const scoutRegistrationTrend = getDailyRegistrations('scout');
  const coachRegistrationTrend = getDailyRegistrations('coach');

  const overallRegistrationTrend = [
    ...talentRegistrationTrend,
    ...scoutRegistrationTrend,
    ...coachRegistrationTrend,
  ].reduce((acc: RegistrationTrend[], current) => {
    const existing = acc.find((item) => item.day === current.day);
    if (existing) {
      existing.registrations += current.registrations;
    } else {
      acc.push(current);
    }
    return acc;
  }, []).sort((a, b) => {
    const [dayA, monthA, yearA] = a.day.split('-').map(Number);
    const [dayB, monthB, yearB] = b.day.split('-').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA); 
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateA.getTime() - dateB.getTime();
  });

  // Chart component for reusability
  interface ChartProps {
    data: RegistrationTrend[];
    title: string;
    color?: string;
  }

  const RegistrationTrendChart: React.FC<ChartProps> = ({ data, color = '#8884d8' }) => (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #ddd', 
            borderRadius: '8px' 
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="registrations" 
          stroke={color} 
          strokeWidth={3} 
          dot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
          activeDot={{ r: 8, fill: color, stroke: 'white', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="container-fluid bg-light p-4 rounded shadow" style={{ maxWidth: '1000px' }}>
      <div className="row">
        {/* Sidebar - Changed from bg-white to bg-dark with flex column setup */}
        <div className="col-md-2 bg-dark rounded p-3 me-3 d-flex flex-column" style={{ minHeight: "calc(100vh - 32px)" }}>
          <div className="d-flex align-items-center mb-4">
            <div className="bg-dark text-white p-1 rounded me-2">
              <BsSpeedometer2 />
            </div>
            <span className="fw-bold text-white">Triple S Admin</span>
          </div>
          
          <div className="nav flex-column flex-grow-1">
            {/* Sidebar content would go here */}
          </div>
          
          {/* Back to Admin Profile link - positioned at bottom */}
          <div className="mt-auto pt-3">
            <Link to="/admin-profile" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-bg-secondary">
              <BsArrowLeft className="me-2" />
              <span>Back to Admin Profile</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="col">
          {/* Header - Changed from bg-white to bg-dark */}
          <div className="bg-dark rounded p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0 text-white">Dashboard Overview</h5>
                <p className="text-light mb-0">Welcome back, {user?.name || 'Admin'}</p>
              </div>
              <div className="d-flex align-items-center">
                <BsBell className="me-3 text-white" />
                <div className="bg-secondary rounded-circle" style={{ width: '30px', height: '30px' }}></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="bg-white rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <BsTrophy className="me-2 text-secondary" />
                  <span className="text-secondary">Total Talents</span>
                </div>
                <h3>{totalTalents}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <BsBinoculars className="me-2 text-secondary" />
                  <span className="text-secondary">Active Scouts</span>
                </div>
                <h3>{totalScouts}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <BsPerson className="me-2 text-secondary" />
                  <span className="text-secondary">Total Coaches</span>
                </div>
                <h3>{totalCoaches}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded p-3">
                <div className="d-flex align-items-center mb-2">
                  <BsPeople className="me-2 text-secondary" />
                  <span className="text-secondary">Total Users</span>
                </div>
                <h3>{totalTalents + totalScouts + totalCoaches}</h3>
              </div>
            </div>
          </div>

          {/* Registration Trends */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="bg-white rounded p-3">
                <h5 className="mb-3">Talents Registration Trend</h5>
                <RegistrationTrendChart data={talentRegistrationTrend} title="Talents Registration" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded p-3">
                <h5 className="mb-3">Scouts Registration Trend</h5>
                <RegistrationTrendChart data={scoutRegistrationTrend} title="Scouts Registration" />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="bg-white rounded p-3">
                <h5 className="mb-3">Coaches Registration Trend</h5>
                <RegistrationTrendChart data={coachRegistrationTrend} title="Coaches Registration" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded p-3">
                <h5 className="mb-3">Overall Registration Trend</h5>
                <RegistrationTrendChart data={overallRegistrationTrend} title="Overall Registration" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;