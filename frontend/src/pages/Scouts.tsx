import { useState, useEffect } from 'react'; 
import { Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';

const positionsByDiscipline = {
  Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Art: ['Musician', 'Painter', 'Sculptor']
};

const ScoutDashboard = () => {
  const { user }= useAuth();
  const [] = useState('All Positions'); // Fixed the empty array
  const [requirements, setRequirements] = useState('');
  const [filters, setFilters] = useState({
    position: 'All Positions',
    ageRange: 'All Ages',
    experienceLevel: 'All Levels'
  });

  const [talents, setTalents] = useState<{
    _id: string;
    email: string;
    discipline: string;
    dashboard: {
      _id: string;
      name: string;
      phoneNumber: string;
      dateOfBirth: string;
      country: string;
      position: string;
      experience: string;
      currentClub: string;
      preferredFoot: string;
      mediaContent: {
        fileType: string;
        fileUrl: string;
        _id: string;
      }[];
    }[];
    review: any[];
    createdAt: string;
    __v: number;
  }[]>([]);

  // Fetch talents when the component mounts
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        // Make the GET request to fetch talents from the backend
        const response = await fetch('http://localhost:3000/talent/getTalents');
        
        if (!response.ok) {
          throw new Error('Failed to fetch talents');
        }

        const data = await response.json();
        setTalents(data); // Store fetched data in the talents state
      } catch (error) {
        console.error(error);
        // Optionally, handle errors (e.g., show a message to the user)
      }
    };

    fetchTalents();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  
  // Mock user data
  const scoutDiscipline = 'Football';
  
  

  // Handle filter change
  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle post requirement form submission
  const handleSubmitRequirements = async () => {
    const position = filters.position;
    try{

    // Retrieve the token from localStorage (or another storage method)
    const token = localStorage.getItem('authToken');
      
    if (!token) {
      alert('You must be logged in to submit a requirement.');
      return;
    }

    // Assuming the coachId is stored in the token or auth context
    if (!user) {
      alert('User is not authenticated.');
      return;
    }
    const scoutId = user._id;  // Replace with actual coachId from your user context
  
      // Make sure position and requirements are filled
    if (!position || !requirements) {
      alert("Please select a position and provide additional requirements.");
      return;
    }
    
    // Send the data to the backend API
    const response = await fetch('http://localhost:3000/scout/submitRequirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        scoutId,
        position,
        requirements
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Requirement posted successfully!');
      console.log(data);
    } else {
      alert('Error posting requirement.');
      console.error(data);
    }
    }catch (error) {
      console.error('Error submitting Requirements:', error);
      alert('There was an error submitting talent requirements.');
    }
    
  };


  return (
    <>
    <Navbar></Navbar>
    {/* Removed the bg-light class from container-fluid and removed padding */}
    <div className="container-fluid p-0">
      {/* Navbar - Full width with dark blue background */}
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="card shadow-sm" style={{ 
            backgroundColor: '#1a365d', 
            borderRadius: '0', // Removed border radius for full-width effect
          }}>
            <div className="card-body d-flex justify-content-between align-items-center px-4">
              <h2 className="mb-0 text-white">Scout Dashboard</h2>
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-3 px-3 py-2 rounded-pill">{scoutDiscipline} Scout</span>
                <div className="dropdown">
                  <Bell className="text-white cursor-pointer" size={20} />
                </div>
                <img src="/api/placeholder/40/40" className="rounded-circle ms-3" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Container for centered content */}
      <div className="container py-4">
        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Find Talents</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Position</label>
                    <select 
                      className="form-select" 
                      name="position"
                      value={filters.position} 
                      onChange={handleFilterChange}
                    >
                      <option value="All Positions">All Positions</option>
                      {positionsByDiscipline[scoutDiscipline]?.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Age Range</label>
                    <select 
                      className="form-select" 
                      name="ageRange"
                      value={filters.ageRange} 
                      onChange={handleFilterChange}
                    >
                      <option value="All Ages">All Ages</option>
                      <option value="8-11">8-11</option>
                      <option value="12-14">12-14</option>
                      <option value="15-17">15-17</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Experience Level</label>
                    <select 
                      className="form-select" 
                      name="experienceLevel"
                      value={filters.experienceLevel} 
                      onChange={handleFilterChange}
                    >
                      <option value="All Levels">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Talents Grid */}
        <div className="row mb-4">
          {talents.map(talent => (
            <div className="col-md-4 mb-3" key={talent._id}>
              <div className="card shadow-sm h-100">
                <div className="position-relative">
                  {/* Use the first media content or a placeholder if empty */}
                  <img 
                    src={talent.dashboard[0]?.mediaContent[0]?.fileUrl || '/api/placeholder/image.jpg'} 
                    className="card-img-top" 
                    alt={talent.dashboard[0]?.name} 
                  />
                  <span className="position-absolute top-0 end-0 m-2 badge bg-success">Available</span>
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary">{talent.dashboard[0]?.position}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{talent.dashboard[0]?.name}</h5>
                  <div className="d-flex mb-2">
                    <div className="me-3">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {talent.dashboard[0]?.country || 'Unknown'}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="me-3">
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>
                        Age: {talent.dashboard[0]?.dateOfBirth ? new Date().getFullYear() - new Date(talent.dashboard[0]?.dateOfBirth).getFullYear() : 'N/A'}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div>
                      <small className="text-muted">
                        <i className="bi bi-trophy me-1"></i>
                        {talent.dashboard[0]?.experience || 'Experience not provided'}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    {/* <Link to={`/talent-profile/${talent._id}`} className="btn btn-primary w-100 me-1">
                      View Profile
                    </Link>
                    <button className="btn btn-outline-secondary" style={{ width: '40px' }}>
                      <MessageCircle size={16} />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Requirement Section */}
        <div className="mb-4">
          <h2 className="h5 mb-3">Post Talent Requirement</h2>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-secondary">Position Required</label>
                <select 
                  className="form-select"
                  value={filters.position} 
                  onChange={handleFilterChange} 
                  name="position"
                >
                  <option value="All Positions">Select Position</option>
                  {positionsByDiscipline[scoutDiscipline]?.map((position) => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary">Additional Requirements</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Describe your requirements..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-primary px-4" onClick={handleSubmitRequirements}>
                Post Requirement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};    

export default ScoutDashboard;