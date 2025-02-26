import { useState } from 'react'; 
import { Bell, MessageCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const positionsByDiscipline = {
  Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Art: ['Musician', 'Painter', 'Sculptor']
};

const ScoutDashboard = () => {
  const [] = useState('All Positions');
  const [requirements, setRequirements] = useState('');
  const [filters, setFilters] = useState({
    position: 'All Positions',
    ageRange: 'All Ages',
    experienceLevel: 'All Levels'
  });
  
  // Mock user data
  const scoutDiscipline = 'Football';
  
  // Mock talent data
  const talents = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Striker',
      location: 'London, UK',
      experience: '3 years experience',
      age: 19,
      imageUrl: '/api/placeholder/400/250'
    },
    {
      id: 2,
      name: 'David Wilson',
      position: 'Goalkeeper',
      location: 'Manchester, UK',
      experience: '5 years experience',
      age: 21,
      imageUrl: '/api/placeholder/400/250'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      position: 'Midfield',
      location: 'Liverpool, UK',
      experience: '4 years experience',
      age: 20,
      imageUrl: '/api/placeholder/400/250'
    }
  ];

  // Handle filter change
  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="container-fluid py-4 px-4 bg-light">
      {/* Navbar */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Scout Dashboard</h2>
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-3 px-3 py-2 rounded-pill">{scoutDiscipline} Scout</span>
                <div className="dropdown">
                  <Bell className="text-muted cursor-pointer" size={20} />
                </div>
                <img src="/api/placeholder/40/40" className="rounded-circle ms-3" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <div className="row g-4 mb-5">
        {talents.map((talent) => (
          <div key={talent.id} className="col-md-4">
            <div className="card border-0 shadow-sm h-100 hover-effect">
              <div className="position-relative">
                <img
                  src={talent.imageUrl}
                  className="card-img-top"
                  alt={talent.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                  Available
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title mb-0">{talent.name}</h5>
                  <span className="badge bg-primary rounded-pill px-3">{talent.position}</span>
                </div>
                <div className="mb-3">
                  <p className="text-muted mb-2">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {talent.location}
                  </p>
                  <p className="text-muted mb-2">
                    <i className="bi bi-person-fill me-2"></i>
                    Age: {talent.age}
                  </p>
                  <p className="text-muted mb-0">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    {talent.experience}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary flex-grow-1">
                    View Profile
                  </button>
                  <button className="btn btn-outline-primary px-3">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Requirement Section */}
      <div>
        <h2 className="h5 mb-3">Post Talent Requirement</h2>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label text-secondary">Position Required</label>
              <select className="form-select">
                <option value="">Select Position</option>
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
            <button className="btn btn-primary px-4">
              Post Requirement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutDashboard;
