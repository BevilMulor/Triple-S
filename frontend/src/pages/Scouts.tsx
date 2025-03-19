import { useState, useEffect } from 'react'; 
import { Bell, MessageCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';
import { useNavigate } from 'react-router-dom';

// Define proper types for discipline
type Discipline = 'Football' | 'Basketball' | 'Art';

// Define positions by discipline with type safety
const positionsByDiscipline: Record<Discipline, string[]> = {
  Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Art: ['Musician', 'Painter', 'Sculptor']
};

// Define talent interface for type safety
interface MediaContent {
  fileType: string;
  fileUrl: string;
  _id: string;
}

interface Dashboard {
  _id: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  position: string;
  experience: string;
  currentClub: string;
  preferredFoot: string;
  mediaContent: MediaContent[];
}

interface Talent {
  _id: string;
  email: string;
  discipline: string;
  dashboard: Dashboard[];
  review: any[]; // Using any for now, can be refined later
  createdAt: string;
  __v: number;
}

// Define filters interface
interface Filters {
  position: string;
  ageRange: string;
  experienceLevel: string;
}

const ScoutDashboard = () => {
  const navigate= useNavigate();
  const { user }= useAuth();
  const [] = useState('All Positions'); // Fixed the empty array
  const [requirements, setRequirements] = useState('');
  const [filters, setFilters] = useState({
    position: 'All Positions',
    ageRange: 'All Ages',
    experienceLevel: 'All Levels'
  });
   const [discipline, setDiscipline] = useState<Discipline>('Football'); // Default value
  const [talents, setTalents] = useState<Talent[]>([]);

  // Fetch talents when the component mounts
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await fetch('http://localhost:3000/talent/getTalents');
        
        if (!response.ok) {
          throw new Error('Failed to fetch talents');
        }

        const data = await response.json();
        setTalents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTalents();
  }, []);

  
  // Mock user data
  const scoutDiscipline = user?.discipline;
  
  

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle post requirement form submission
  const handleSubmitRequirements = async () => {
    const position = filters.position;
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');
        
      if (!token) {
        alert('You must be logged in to submit a requirement.');
        return;
      }

      if (!user) {
        alert('User is not authenticated.');
        return;
      }
      const scoutId = user._id;
    
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
    } catch (error) {
      console.error('Error submitting Requirements:', error);
      alert('There was an error submitting talent requirements.');
    }
  };

  const handleButtonClick=(id:any)=>{
    
    console.log('ViewProfile button clicked');
    if(!id){
       alert("No Profile Found");
    }else{
      navigate(`/talent-profile/${id}`)
    }
  }
  // const handleButtonClick=()=>{
  //   navigate('/actual-talent-profile')
  // }

  const handleProfileClick=()=>{
    console.log("'go to profile' button clicked");
    navigate('/actual-scout-profile');
  }

  // Calculate age function with proper typing
  const calculateAge = (dateOfBirth: string | undefined): string => {
    if (!dateOfBirth) return 'N/A';
    try {
      return (new Date().getFullYear() - new Date(dateOfBirth).getFullYear()).toString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <>
    <Navbar />
    <div className="container-fluid p-0">
      {/* Navbar - Full width with dark blue background */}
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="card shadow-sm" style={{ 
            backgroundColor: '#212529', 
            borderRadius: '0.5 rem',
          }}>
            <div className="card-body d-flex justify-content-between align-items-center px-4">
              <h2 className="mb-0 text-white">Scout Dashboard</h2>
              <div className="d-flex align-items-center">
                <button onClick={handleProfileClick}>
                <span className="badge bg-light text-primary me-3 px-3 py-2 rounded-pill">{scoutDiscipline} Scout</span>
                </button>
                
                
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
                      {positionsByDiscipline[discipline]?.map((position) => (
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
                    alt={talent.dashboard[0]?.name || 'Talent'} 
                  />
                  <span className="position-absolute top-0 end-0 m-2 badge bg-success">Available</span>
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary">{talent.dashboard[0]?.position || 'Unknown'}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{talent.dashboard[0]?.name || 'Unknown'}</h5>
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
                        Age: {calculateAge(talent.dashboard[0]?.dateOfBirth)}
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
                  <button 
                        className="btn btn-primary w-100 me-1"
                        onClick={() => handleButtonClick(talent?.dashboard?.[0]?._id)}
                        // onClick={handleButtonClick}
                        

                      >
                        View Profile
                      </button>
                    <button className="btn btn-outline-secondary" style={{ width: '40px' }}>
                      <MessageCircle size={16} />
                    </button> 
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
                  {positionsByDiscipline[discipline]?.map((position) => (
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