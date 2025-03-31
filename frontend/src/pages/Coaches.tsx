import { useState, useEffect } from 'react';
import { Bell, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';
import { Link } from 'react-router-dom'; // Import Link and useNavigate for routing
import { useNavigate } from 'react-router-dom';
import { useApiUrl } from '../apiurl/ApiContext';

interface Media {
  fileUrl: string;
}

interface ProfileData {
  profile?: {
    name?: string;
    currentClub?: string;
    experience?: string;
    mediaContent?: Media[];
  }[];
}
const CoachDashboard = () => {
  const { user } = useAuth();  // Example: useAuth() from a context provider
  console.log('user:', user);
  
  // State for the coach's discipline (pulled from auth/profile)
  const navigate= useNavigate();
  const apiUrl = useApiUrl(); // Get the API URL from context
  //const [coachDiscipline] = useState('Football');
  const [coachDiscipline, setCoachDiscipline] = useState('Coach'); // Default to generic "Coach"
  const [selectedTalent, setSelectedTalent] = useState('');
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
  const [] = useState<ProfileData | null>(null);
  const [] = useState(true);

  //fetch particular talent using params
   // Fetch profile data - updated to use the id from URL if available
  // Handle view profile click
  // const handleViewProfile=()=>{
  //   let id=talent.dashboard[0]._id;
  //   // Use the id from URL params if available, otherwise use the default endpoint
  //   const endpoint = id
  //     ? `http://localhost:3000/talent/getOProfileById/${id}`
  //     : 'http://localhost:3000/talent/getProfile';

  //   fetch(endpoint, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
        
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data: ProfileData) => {
  //       setProfileData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error checking user profile:', error);
  //       setError('Failed to load profile');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  // }
   
    
   

  // Update coachDiscipline when user data is available
  useEffect(() => {
    if (user && user.discipline) {
      setCoachDiscipline(user.discipline);
    }
  }, [user]);

  // Fetch talents when the component mounts
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        // Make the GET request to fetch talents from the backend
        const response = await fetch(`${apiUrl}/talent/getTalents`);
        
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

  const handleProfileClick=()=>{
    console.log("'go to profile' button clicked");
    navigate('/actual-coach-profile');
  }

  // Handle submit rating and comments
  const handleSubmitRating = async () => {
    if (!selectedTalent || !ratings.overall || !comments) {
      alert('Please make sure to select a talent, provide a rating, and add a comment.');
      return;
    }
  
    try {
      // Retrieve the token from localStorage (or another storage method)
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        alert('You must be logged in to submit a rating.');
        return;
      }
  
      // Assuming the coachId is stored in the token or auth context
      const coachId = user ? user._id : '';  // Replace with actual coachId from your user context
  
      const response = await fetch(`${apiUrl}/coach/submitReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          coachId,             // Use the coachId from the logged-in user
          talentUserId: selectedTalent, // Use the selected talentId
          ballDistributionR: ratings.skill1,
          composureR: ratings.skill2,
          dribblingR: ratings.skill3,
          comment: comments,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
  
      await response.json();
      alert('Rating submitted successfully!');
      // Reset the form after success
      setSelectedTalent('');
      setRatings({ overall: 3, skill1: 8, skill2: 7, skill3: 9 });
      setComments('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('There was an error submitting your rating.');
    }
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
  const handleButtonClick=(id:any)=>{
    
    console.log('ViewProfile button clicked');
    if(!id){
       alert("No Profile Found");
    }else{
      navigate(`/talent-profile/${id}`)
    }
  }
  const skillLabels = getSkillLabels();
  console.log('talents: ',talents);

  return (
    <>
    <Navbar></Navbar>
    <div className="container-fluid p-0">
      {/* Header - Full width with dark blue background */}
      <div className="row m-0">
        <div className="col-12 px-0"> {/* Remove padding from column */}
          <div className="card shadow-sm bg-dark text-white" style={{ borderRadius: '0.5rem' }}> {/* Dark blue background and no rounded corners */}
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Coach Dashboard</h2>
              <div className="d-flex align-items-center">
                <button onClick={handleProfileClick}>
                <span className="badge bg-light text-primary me-3 px-3 py-2 rounded-pill">{coachDiscipline} Coach</span>
                </button>
                
                <div className="dropdown">
                  <Bell className="text-white cursor-pointer" size={20} />
                </div>
                <Link to="/coach-profile">
                  <img 
                    src="/api/placeholder/40/40" 
                    className="rounded-circle ms-3" 
                    alt="Profile" 
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters - Centered with margins */}
      <div className="row mb-4">
        <div className="col-12 col-md-10 mx-auto"> {/* Centered with margins */}
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

      {/* Talent Cards - Centered with margins */}
      <div className="row mb-4">
        <div className="col-12 col-md-10 mx-auto"> {/* Centered container */}
          <div className="row">
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
                      
                      

                      <button 
                        className="btn btn-primary w-100 me-1"
                        onClick={() => handleButtonClick(talent?.dashboard?.[0]?._id)}
                        

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
        </div>
      </div>

      {/* Rating Card - Centered with margins */}
      <div className="row mb-4">
        <div className="col-12 col-md-10 mx-auto"> {/* Centered with margins */}
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
                    // Use the talent._id as the value and the talent.dashboard[0].name as the display text
                    <option key={talent._id} value={talent._id}>
                      {talent.dashboard[0]?.name || 'Unknown Talent'}
                    </option>
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
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        value={ratings.skill1}
                        onChange={(e) => handleRatingChange('skill1', e.target.value)}
                      />
                      <small>{ratings.skill1}</small>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">{skillLabels[1]}</label>
                      <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        value={ratings.skill2}
                        onChange={(e) => handleRatingChange('skill2', e.target.value)}
                      />
                      <small>{ratings.skill2}</small>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">{skillLabels[2]}</label>
                      <input
                        type="range"
                        className="form-range"
                        min="1"
                        max="10"
                        value={ratings.skill3}
                        onChange={(e) => handleRatingChange('skill3', e.target.value)}
                      />
                      <small>{ratings.skill3}</small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comments</label>
                    <textarea
                      className="form-control"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <button className="btn btn-primary" onClick={handleSubmitRating}>
                    Submit Rating
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CoachDashboard;