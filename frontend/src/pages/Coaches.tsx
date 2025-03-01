import { useState, useEffect } from 'react';
import { MessageCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoachDashboard = () => {
  // State for the coach's discipline (pulled from auth/profile)
  const [coachDiscipline] = useState('Football');
  const [selectedTalent, setSelectedTalent] = useState('');
  const [talents, setTalents] = useState<{ id: number; name: string; age: number; position: string; location: string; experience: string; image: string; }[]>([]);
  const [ratings, setRatings] = useState({
    overall: 3,
    skill1: 8,
    skill2: 7,
    skill3: 9,
  });
  const [comments, setComments] = useState('');
  const [filters, setFilters] = useState({
    position: 'All Positions',
    ageRange: 'All Ages',
    experienceLevel: 'All Levels'
  });

  // Mock talent data - in a real app, this would come from an API
  useEffect(() => {
    // This would be fetched based on the coach's discipline
    const mockTalentData: { [key: string]: { id: number; name: string; age: number; position: string; location: string; experience: string; image: string; }[] } = {
      'Football': [
        { id: 1, name: 'John Smith', age: 19, position: 'Striker', location: 'London, UK', experience: '3 years experience', image: '/api/placeholder/320/180' },
        { id: 2, name: 'David Wilson', age: 21, position: 'Goalkeeper', location: 'Manchester, UK', experience: '5 years experience', image: '/api/placeholder/320/180' },
        { id: 3, name: 'Sarah Johnson', age: 20, position: 'Midfield', location: 'Liverpool, UK', experience: '4 years experience', image: '/api/placeholder/320/180' },
      ],
      'Basketball': [
        { id: 1, name: 'Michael Johnson', age: 19, position: 'Point Guard', location: 'Chicago, US', experience: '2 years experience', image: '/api/placeholder/320/180' },
        { id: 2, name: 'James Wilson', age: 20, position: 'Shooting Guard', location: 'New York, US', experience: '3 years experience', image: '/api/placeholder/320/180' },
      ],
      'Art': [
        { id: 1, name: 'Emma Thompson', age: 22, position: 'Painter', location: 'Paris, FR', experience: '4 years experience', image: '/api/placeholder/320/180' },
        { id: 2, name: 'Luis Garcia', age: 25, position: 'Sculptor', location: 'Madrid, ES', experience: '6 years experience', image: '/api/placeholder/320/180' },
      ]
    };
    
    setTalents(mockTalentData[coachDiscipline as keyof typeof mockTalentData] || []);
  }, [coachDiscipline]);

  // Function to navigate to talent profile
  // const navigateToProfile = (talentId: number) => {
  //   router.push({
  //     pathname: '/talent-profile',
  //     query: { 
  //       id: talentId,
  //       viewMode: 'coach',
  //       discipline: coachDiscipline
  //     }
  //   });
  // };

  // Handle rating change
  const handleRatingChange = (field: string, value: string) => {
    setRatings({
      ...ratings,
      [field]: parseInt(value)
    });
  };

  // Handle star rating click
  const handleStarClick = (rating: number) => {
    setRatings({
      ...ratings,
      overall: rating
    });
  };

  // Handle filter change
  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle submit rating and comments
  const handleSubmitRating = () => {
    console.log('Submitted rating for', selectedTalent, ':', ratings, comments);
    // This would send data to an API in a real application
    alert('Rating submitted successfully!');
  };

  // Get dynamic skill labels based on discipline
  const getSkillLabels = () => {
    switch(coachDiscipline) {
      case 'Football':
        return ['Ball Control', 'Shooting', 'Defense'];
      case 'Basketball':
        return ['Ball Handling', 'Shooting', 'Defense'];
      case 'Art':
        return ['Technique', 'Creativity', 'Composition'];
      default:
        return ['Skill 1', 'Skill 2', 'Skill 3'];
    }
  };

  const skillLabels = getSkillLabels();

  return (
    <div className="container-fluid bg-light py-4 min-vh-100">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Coach Dashboard</h2>
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-3 px-3 py-2 rounded-pill">{coachDiscipline} Coach</span>
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
                    {coachDiscipline === 'Football' && (
                      <>
                        <option value="Striker">Striker</option>
                        <option value="Goalkeeper">Goalkeeper</option>
                        <option value="Midfield">Midfield</option>
                        <option value="Defense">Defense</option>
                      </>
                    )}
                    {coachDiscipline === 'Basketball' && (
                      <>
                        <option value="Point Guard">Point Guard</option>
                        <option value="Shooting Guard">Shooting Guard</option>
                      </>
                    )}
                    {coachDiscipline === 'Art' && (
                      <>
                        <option value="Painter">Painter</option>
                        <option value="Sculptor">Sculptor</option>
                      </>
                    )}
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

      {/* Talent Cards */}
      <div className="row mb-4">
        {talents.map(talent => (
          <div className="col-md-4 mb-3" key={talent.id}>
            <div className="card shadow-sm h-100">
              <div className="position-relative">
                <img src={talent.image} className="card-img-top" alt={talent.name} />
                <span className="position-absolute top-0 end-0 m-2 badge bg-success">Available</span>
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge bg-primary">{talent.position}</span>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{talent.name}</h5>
                <div className="d-flex mb-2">
                  <div className="me-3">
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {talent.location}
                    </small>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="me-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Age: {talent.age}
                    </small>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div>
                    <small className="text-muted">
                      <i className="bi bi-trophy me-1"></i>
                      {talent.experience}
                    </small>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to={`/talent-profile`} className="btn btn-primary w-100 me-1">
                    View Profile
                  </Link>
                  <button className="btn btn-outline-secondary" style={{ width: '40px' }}>
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Rate Talent</h5>
              <div className="mb-3">
                <label className="form-label">Select Talent</label>
                <select 
                  className="form-select" 
                  value={selectedTalent} 
                  onChange={(e) => setSelectedTalent(e.target.value)}
                >
                  <option value="">Select a talent</option>
                  {talents.map(talent => (
                    <option key={talent.id} value={talent.id}>{talent.name}</option>
                  ))}
                </select>
              </div>

              {selectedTalent && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Overall Rating</label>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          onClick={() => handleStarClick(star)}
                          style={{ cursor: 'pointer', fontSize: '24px', color: star <= ratings.overall ? '#ffc107' : '#e4e5e9' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">{skillLabels[0]}</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="10"
                        value={ratings.skill1}
                        onChange={(e) => handleRatingChange('skill1', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">{skillLabels[1]}</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="10"
                        value={ratings.skill2}
                        onChange={(e) => handleRatingChange('skill2', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">{skillLabels[2]}</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="10"
                        value={ratings.skill3}
                        onChange={(e) => handleRatingChange('skill3', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Coach Comments</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Enter your feedback and comments..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    className="btn btn-primary" 
                    onClick={handleSubmitRating}
                  >
                    Submit Rating & Comments
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
