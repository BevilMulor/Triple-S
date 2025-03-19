
import { useAuth } from '../auth/realAuthContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Video, Pen } from 'lucide-react';
import { Modal } from 'react-bootstrap';

const positionsByDiscipline = {
  Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Art: ['Musician', 'Painter', 'Sculptor']
};

const OpenTalentProfile = () => {
  const { id } = useParams(); // Get the  dashboard id from URL params
  console.log('talentcardid from params: ',id)
  const [] = useState('All Positions'); // Fixed the empty array
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [coachDiscipline] = useState('Football');
  const [comments, setComments] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [filters, setFilters] = useState({
    position: 'All Positions',
    ageRange: 'All Ages',
    experienceLevel: 'All Levels'
  });
  const [selectedTalent, setSelectedTalent] = useState('');
  const { user } = useAuth(); // Assuming you need user context
  const [ratings, setRatings] = useState({
    overall: 3,
    skill1: 8,
    skill2: 7,
    skill3: 9,
  });
  const [] = useState('All Positions'); // Fixed the empty array
  const [requirements, setRequirements] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  // Functions to handle modal open/close
  const [showMediaModal, setShowMediaModal] = useState(false); // Fixed duplicate declaration
  const handleCloseModal = () => setShowMediaModal(false);
  const handleShowModal = () => setShowMediaModal(true);
  const [loading, setLoading] = useState(true);
 
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
  const scoutDiscipline=user?.discipline;

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (!token || !id) {
      setLoading(false);
      return;
    }

    console.log('user',user);
    console.log('token',token)
    let apiUrl
    if(user.role==="Coach"){
      apiUrl=`http://localhost:3000/talent/getOpenTalentProfile/${id}`
    }
    if(user.role==="Scout"){
      apiUrl=`http://localhost:3000/talent/getOpenTalentProfile2/${id}`
    }
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.profile) {
        setProfile(data.profile); // Store the profile data in state
        setSelectedTalent(data.profile?._id); // Assuming the dashboard is an array
        setReviews(data.reviews);
      } else {
        setError('Profile not found');
      }
    })
    .catch((error) => {
      console.error('Error checking user profile:', error);
      setError('Failed to load profile');
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  // Handle submit rating and comments
  const handleSubmitRating = async () => {
    console.log('Submit button clicked');
    console.log("selected talent: ",selectedTalent);
    console.log("ratings overall: ", ratings.overall);
    console.log("comments: ",comments);  
    // Ensure that selectedTalent, ratings, and comments are provided
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
  
      // If the selectedTalent is just the dashboard ID, retrieve the corresponding TalentUser
      const response = await fetch(`http://localhost:3000/coach/getTalentByDashboardId/${selectedTalent}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const talentData = await response.json();
  
      if (!talentData || !talentData._id) {
        alert('Talent not found for the provided dashboard ID.');
        return;
      }
  
      const talentUserId = talentData._id; // Get the TalentUser ID from the response
  
      // Make the POST request to submit the  coach review
      const reviewResponse = await fetch('http://localhost:3000/coach/submitReview2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          coachId,  // Use the coachId from the logged-in user
          talentUserId,  // Use the talent's ID (from talentData)
          ballDistributionR: ratings.skill1,
          composureR: ratings.skill2,
          dribblingR: ratings.skill3,
          comment: comments,
        }),
      });
  
      if (!reviewResponse.ok) {
        throw new Error('Failed to submit rating');
      }
  
      await reviewResponse.json();
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



 //Handle rating change
  const handleRatingChange = (field: string, value: string) => {
    setRatings({
      ...ratings,
      [field]: parseInt(value)
    });
  };
//handle star click
  const handleStarClick = (star: number) => {
    setRatings({
      ...ratings,
      overall: star,
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
  // Handle post requirement form submission
  const handleSubmitScoutRequirements = async () => {
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
  // Handle tab click event
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  
  const renderTabContent = () => {
    console.log('profile from OpenTalentProfile: ', profile);
    const mediaContent=profile.mediaContent
    console.log("talent's reviews from openTalent: ", reviews);
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className="card">
              <div className="card-body position-relative">
                <div className="row">
                  <div className="col-md-6 col-6 col-sm-12">
                    <h6 className="text-muted">Name</h6>
                    <p className="mb-4">{profile?.name || "N/A"}</p>
                    <h6 className="text-muted">Current Club</h6>
                    <p className="mb-4">{profile?.currentClub || "N/A"}</p>
                    <h6 className="text-muted">Experience</h6>
                    <p className="mb-4">{profile?.experience || "No experience listed"}</p>
                    <h6 className="text-muted">Phone Number</h6>
                    <p className="mb-4">{profile?.phoneNumber || "Not provided"}</p>
                  </div>
                  <div className="col-sm-12 col-md-6 col-6 d-flex align-items-center justify-content-center">
                    <div className="media-content text-center">
                      <div className="d-flex flex-column align-items-center">
                        <Video size={40} className="mb-3 text-primary" />
                        <h6 className="mb-3">Media</h6>
                        <Button variant="outline-primary" onClick={handleShowModal}>
                          View Media
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={showMediaModal} onHide={handleCloseModal} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>Media</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {mediaContent && mediaContent[0] ? (
                  mediaContent[0].fileUrl?.endsWith('.jpg') || mediaContent[0].fileUrl?.endsWith('.png') ? (
                    <img src={mediaContent[0].fileUrl} alt="Media" className="img-fluid" />
                  ) : mediaContent[0].fileUrl?.endsWith('.mp4') ? (
                    <video controls className="w-100">
                      <source src={mediaContent[0].fileUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : mediaContent[0].fileUrl?.includes('youtube.com') ? (
                    <div className="ratio ratio-16x9">
                      <iframe src={mediaContent[0].fileUrl} title="Media" allowFullScreen></iframe>
                    </div>
                  ) : (
                    <p>Unsupported media type</p>
                  )
                ) : (
                  <p>No media available</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
        case 'feedback':
          console.log('Feedback data:', reviews);
        
          return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Feedback</h5>
                {loading ? (
                  <p className="text-muted">Loading feedback...</p>
                ) : error ? (
                  <p className="text-danger">Error: {error}</p>
                ) : reviews.length === 0 ? (
                  <p className="text-muted">No feedback to display</p>
                ) : (
                  <ul className="list-group">
                    {reviews.map((review) => (
                      <li key={review._id} className="list-group-item">
                        <p><strong>Coach:</strong> {review.coach?.dashboard?.[0]?.name || "Unknown"}</p>
                        <p><strong>Ball Distribution:</strong> {review.ballDistributionR}</p>
                        <p><strong>Composure:</strong> {review.composureR}</p>
                        <p><strong>Dribbling:</strong> {review.dribblingR}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        case 'scout-requirements':
          console.log('requirements data: ', requirements);
          return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Scout Requirements</h5>
                {requirements ? (
                  <ul>
                    <li>Test Content: Scout Requirements Loaded</li>
                  </ul>
                ) : (
                  <p>Scout Requirements are not available</p>
                )}
                {loading ? (
                  <p className="text-muted">Loading scout requirements...</p>
                ) : error ? (
                  <p className="text-danger">Error: {error}</p>
                ) : requirements.length === 0 ? (
                  <p className="text-muted">No scout requirements to display</p>
                ) : (
                  <ul className="list-group">
                    {requirements.map((req) => (
                      <li key={req._id} className="list-group-item">
                        <strong>Position:</strong> {req.position} <br />
                        <strong>Requirements:</strong> {req.requirements} <br />
                        <strong>Scout Name:</strong> {req.scout?.name || "Unknown"} <br />
                        <strong>Scout Email:</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
    }
  };
  return (
    <>
      <div className="container-fluid bg-light py-4">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="m-0">Talent Profile</h4>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-bell"></i>
                </div>
                <div
                  className="rounded-circle bg-secondary"
                  style={{ width: '40px', height: '40px' }}
                ></div>
              </div>
            </div>
          </div>
  
          <div className="col-md-3 mb-4 mb-md-0">
              <div className="list-group">
                {['profile', 'approvals', 'messages']
                  .concat(user.role === 'Scout' ? ['feedback'] : [])
                  .concat(user.role === 'Coach' ? ['scout-requirements'] : [])
                  .map((tab) => (
                    <button
                      key={tab}
                      className={`list-group-item list-group-item-action d-flex align-items-center ${
                        activeTab === tab ? 'active' : ''
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      <i
                        className={`bi bi-${
                          tab === 'profile'
                            ? 'person'
                            : tab === 'approvals'
                            ? 'check-circle'
                            : tab === 'messages'
                            ? 'envelope'
                            : tab === 'feedback'
                            ? 'star'
                            : 'clipboard-check'
                        } me-2`}
                      ></i>
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </button>
                  ))}
              </div>
            </div>
              
          <div className="col-md-9">{renderTabContent()}</div>
        </div>
  
        {user.role === 'Coach' && (
          <div>
            <div className="mb-3">
              <label className="form-label">Overall Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      cursor: 'pointer',
                      fontSize: '24px',
                      color: star <= ratings.overall ? '#ffc107' : '#e4e5e9',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
  
            <div className="row">
              {skillLabels.map((label, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <label className="form-label">{label}</label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max="10"
                    value={ratings[`skill${index + 1}`]}
                    onChange={(e) => handleRatingChange(`skill${index + 1}`, e.target.value)}
                  />
                  <small>{ratings[`skill${index + 1}`]}</small>
                </div>
              ))}
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
          </div>
        )}
  
        {user.role === 'Scout' && (
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
                      <option key={position} value={position}>
                        {position}
                      </option>
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
                <button className="btn btn-primary px-4" onClick={handleSubmitScoutRequirements}>
                  Post Requirement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
 
  
};

export default OpenTalentProfile;