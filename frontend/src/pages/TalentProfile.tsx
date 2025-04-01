import { useState, useEffect, SetStateAction } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Video, Pen } from 'lucide-react';
import { Modal } from 'react-bootstrap';
import { useApiUrl } from '../apiurl/ApiContext';

// Define interfaces for the data structures
interface Media {
  fileUrl: string;
}

interface ProfileData {
  profile?: {
    name?: string;
    currentClub?: string;
    experience?: string;
    phoneNumber?: string; // Added phone number field
    mediaContent?: Media[];
  }[];
}

interface Review {
  _id: string;
  coach: {
    name: string;
  };
  ballDistributionR: number;
  composureR: number;
  dribblingR: number;
  comment: string;
}

interface Requirement {
  _id: string;
  position: string;
  requirements: string;
  scout?: {
    name: string;
    email: string;
  };
}

const TalentProfile = () => {
  // Add the useNavigate hook for navigation
  const navigate = useNavigate();
  
  // Fixed useParams usage for React Router v6
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('profile');
  const [showMediaModal, setShowMediaModal] = useState(false); // Fixed duplicate declaration
  
  // For the feedback render
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [edit,setEdit]=useState(Boolean)
  const [coachNameData,setCoachNameData]=useState([])
  
  // Functions to handle modal open/close
  const handleCloseModal = () => setShowMediaModal(false);
  const handleShowModal = () => setShowMediaModal(true);
  
  // Function to handle navigation to the Talents page
  const handleEditProfile = (userId, profileId) => {
    setEdit(true);
    navigate('/talents', { state: { isEditing: true, userId, profileId } }); 
};

const apiUrl = useApiUrl(); // Get the API URL from context
//function to delete profile
 // Function to handle navigation to the Talents page
 const handleDeleteProfile = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert("No token found");
    return;
  }

  if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/talent/deleteProfile`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete profile");
    }

    alert("Profile deleted successfully!");
    localStorage.removeItem('authToken'); // Optionally log the user out
    navigate('/'); // Redirect to home or login page
  } catch (error) {
    console.error("Error deleting profile:", error);
    alert("Error deleting profile. Please try again.");
  }
};


  const { user } = useAuth();

  useEffect(() => {
    if (user && user.reviews) {
      // Check if the review is an array or an object, then convert to an array
      setReviews(Array.isArray(user.reviews) ? user.reviews : Object.values(user.reviews || []));
    }
  }, [user]); // Update reviews when user data changes

 

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data - updated to use the id from URL if available
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    // Use the id from URL params if available, otherwise use the default endpoint
    // const endpoint = id
    //   ? `http://localhost:3000/talent/getProfileById/${id}`
    //   : 'http://localhost:3000/talent/getProfile';
    const endpoint =`${apiUrl}/talent/getProfile`

    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data: any) => {
        setProfileData(data.profile);
        setReviews(data.reviews)
      
        console.log('coachInfo: ', reviews);
      })
      .catch((error) => {
        console.error('Error checking user profile:', error);
        setError('Failed to load profile');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Add id as a dependency
  

  // Fetch talent requirements
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch(`${apiUrl}/scout/getRequirements`);
        if (!response.ok) {
          throw new Error("Failed to fetch requirements");
        }
        const data = await response.json();
        setRequirements(data.talentRequirements || []);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };

    fetchRequirements();
  }, []);

  // Loading and error handling before rendering content
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  // Handle tab click event
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

 
  //const [error, setError] = useState<string | null>(null); // Ensure error state is set

//   useEffect(() => {
//     const fetchCoachProfile = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/coach/getProfileNoAuth");
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch coach profile");
//         }
  
//         const data = await response.json();
//         setCoachNameData(data); // ✅ Only set state when fetch is successful
//       } catch (err) {
//         console.log(err)
      
//       }
//     };
  
//     fetchCoachProfile(); // ✅ Call the function properly inside useEffect
//   }, []); // ✅ Ensure empty dependency array to run only on mount
// console.log('coach, ',coachNameData);

  // Rating form component for the profile page
  const RatingForm = () => {
    const { user } = useAuth();
    console.log('user:', user);

    if (user?.role !== 'coach') {
      return null;  // If the user is not a coach, don't render the form
    }
    
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Rate Talent</h5>
          
          <div className="mb-4">
            <p className="mb-2">Overall Rating</p>
            <div className="d-flex">
              <span className="fs-4 text-warning">★</span>
              <span className="fs-4 text-warning">★</span>
              <span className="fs-4 text-secondary">☆</span>
              <span className="fs-4 text-secondary">☆</span>
              <span className="fs-4 text-secondary">☆</span>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="form-label">Ball Distribution</label>
              <select className="form-select">
                <option>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            
            <div className="col-md-4 mb-3 mb-md-0">
              <label className="form-label">Composure</label>
              <select className="form-select">
                <option>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Dribbling</label>
              <select className="form-select">
                <option>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Coach Comments</label>
            <textarea 
              className="form-control" 
              rows={3}
              placeholder="Provide your feedback on this talent's performance, strengths, and areas for improvement"
            ></textarea>
          </div>
          
          <button className="btn btn-primary w-100">
            Submit Ratings & Comments
          </button>
        </div>
      </div>
    );
  };


  // Render tab content based on active tab
  const renderTabContent = () => {
    if (!profileData) {
      navigate('/coaches');
      return <p>No profile data available</p>;
    }
  
    console.log('profileData: ', profileData);
    const mediaContent = profileData[0]?.mediaContent;
  
    // Log the media content if exists
    if (mediaContent) {
      console.log('media content: ', mediaContent);
      console.log('Media URL:', mediaContent[0].fileUrl);
    }

    let dialcode;
    if (profileData[0]?.country === 'KE') {
      dialcode = '+254';
    } else if (profileData[0]?.country === 'RW') {
      dialcode = '+250';
    } else if (profileData[0]?.country === 'UG') {
      dialcode = '+256';
    } else if (profileData[0]?.country === 'TZ') {
      dialcode = '+255';
    } else if (profileData[0]?.country === 'BU') {
      dialcode = '+257';
    } else if (profileData[0]?.country === 'SA') {
      dialcode = '+27';
    }
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className="card">
              <div className="card-body position-relative">
                {/* Updated Edit Profile button with onClick handler */}
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="position-absolute top-0 end-0 m-3"
                  onClick={() => handleEditProfile(user?._id, profileData[0]?._id)}
                >
                  <Pen size={16} className="me-1" /> Edit Profile
                </Button>
                <div>
                  <Button 
                  variant="danger" 
                  size="sm" 
                  className="position-absolute bottom-0 end-0 m-3"
                  onClick={handleDeleteProfile}
                >
                  <Pen size={16} className="me-1" /> Delete Profile
                </Button>
                </div>
               
                
                <div className="row">
                  <div className="col-md-6 col-6 col-sm-12">
                    <h6 className="text-muted">Name</h6>
                    <p className="mb-4">{profileData[0]?.name || "N/A"}</p>
                    <h6 className="text-muted">Current Club</h6>
                    <p className="mb-4">{profileData[0]?.currentClub || "N/A"}</p>
                    <h6 className="text-muted">Experience</h6>
                    <p className="mb-4">{profileData[0]?.experience || "No experience listed"}</p>

                    {/* Changed from Media Content to Phone Number */}
                    <h6 className="text-muted">Phone Number</h6>
                    <p className="mb-4">{`${dialcode}${profileData[0]?.phoneNumber}` || "Not provided"}</p>
                  </div>
                  
                  {/* Center the View Media button in the layout */}
                  <div className="col-sm-12 col-md-6 col-6 d-flex align-items-center justify-content-center">
                    <div className="media-content text-center">
                      <div className="d-flex flex-column align-items-center">
                        <Video size={40} className="mb-3 text-primary" />
                        <h6 className="mb-3">Training highlights 2024</h6>
                        <Button
                          variant="outline-primary"
                          onClick={handleShowModal}
                        >
                          View Media
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Implementation */}
            <Modal show={showMediaModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Media</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Render the first media item */}
              {mediaContent && mediaContent[0] ? (
                <>
                  {mediaContent[0].fileUrl?.endsWith('.jpg') || mediaContent[0].fileUrl?.endsWith('.png') ? (
                    <img 
                      src={mediaContent[0].fileUrl}
                      alt="Media" 
                      className="img-fluid" 
                    />
                  ) : mediaContent[0].fileUrl?.endsWith('.mp4') ? (
                    <video controls className="w-100">
                      <source src={mediaContent[0].fileUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : mediaContent[0].fileUrl?.includes('youtube.com') ? (
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={mediaContent[0].fileUrl}
                        title="Media"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <p>Unsupported media type</p>
                  )}
                </>
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
            <RatingForm />
          </>
        );
        
      case 'approvals':
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Approvals</h5>
              <p className="text-muted">No approvals content to display</p>
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
                      <strong>Scout Name:</strong> {req.scout?.dashboard[0]?.name || "Unknown"} <br />
                      <strong>Scout Email:</strong> {req.scout?.email || "Not provided"} <br />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="card">
            <div className="card-body p-0">
              <div className="row g-0">
                {/* Left sidebar with message threads */}
                <div className="col-md-4 border-end">
                  <div className="p-3 border-bottom">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search messages..." />
                      <button className="btn btn-outline-secondary" type="button">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="messages-list">
                    {/* Active conversation */}
                    <div className="d-flex align-items-center p-3 border-bottom bg-light">
                      <div className="position-relative">
                        <img 
                          src="https://via.placeholder.com/50" 
                          className="rounded-circle me-2" 
                          alt="Coach Smith" 
                          width="50" 
                          height="50" 
                        />
                        <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1" 
                          style={{width: '12px', height: '12px', border: '2px solid white'}}></span>
                      </div>
                      <div className="ms-2 flex-grow-1">
                        <h6 className="mb-0">Coach Smith</h6>
                        <p className="text-muted mb-0 small">Great performance in the last match!</p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">2h ago</small>
                        <div className="badge bg-primary rounded-pill">1</div>
                      </div>
                    </div>
                    
                    {/* Other conversations */}
                    <div className="d-flex align-items-center p-3 border-bottom">
                      <img 
                        src="https://via.placeholder.com/50" 
                        className="rounded-circle me-2" 
                        alt="Recruitment Team" 
                        width="50" 
                        height="50" 
                      />
                      <div className="ms-2 flex-grow-1">
                        <h6 className="mb-0">Recruitment Team</h6>
                        <p className="text-muted mb-0 small">We would like to invite you for a trial...</p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Feb 25</small>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center p-3 border-bottom">
                      <img 
                        src="https://via.placeholder.com/50" 
                        className="rounded-circle me-2" 
                        alt="Team Manager" 
                        width="50" 
                        height="50" 
                      />
                      <div className="ms-2 flex-grow-1">
                        <h6 className="mb-0">Team Manager</h6>
                        <p className="text-muted mb-0 small">Schedule for next week's training</p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Feb 22</small>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center p-3 border-bottom">
                      <img 
                        src="https://via.placeholder.com/50" 
                        className="rounded-circle me-2" 
                        alt="Fitness Coach" 
                        width="50" 
                        height="50" 
                      />
                      <div className="ms-2 flex-grow-1">
                        <h6 className="mb-0">Fitness Coach</h6>
                        <p className="text-muted mb-0 small">Your fitness assessment results</p>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">Feb 20</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side with conversation */}
                <div className="col-md-8">
                  {/* Conversation header */}
                  <div className="d-flex align-items-center p-3 border-bottom">
                    <img 
                      src="https://via.placeholder.com/50" 
                      className="rounded-circle me-2" 
                      alt="Coach Smith" 
                      width="50" 
                      height="50" 
                    />
                    <div>
                      <h6 className="mb-0">Coach Smith</h6>
                      <small className="text-success">Online</small>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-sm btn-outline-secondary me-2">
                        <i className="bi bi-telephone"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages area */}
                  <div className="chat-messages p-4" style={{height: '300px', overflowY: 'auto'}}>
                    {/* Coach message */}
                    <div className="d-flex mb-4">
                      <img 
                        src="https://via.placeholder.com/36" 
                        className="rounded-circle me-2 align-self-start" 
                        alt="Coach Smith" 
                        width="36" 
                        height="36" 
                      />
                      <div className="card bg-light" style={{maxWidth: '70%'}}>
                        <div className="card-body py-2 px-3">
                          <p className="mb-0">Hi there! I wanted to discuss your performance in yesterday's match. You showed excellent positioning and ball control.</p>
                        </div>
                        <div className="card-footer bg-light p-1 text-end">
                          <small className="text-muted">10:22 AM</small>
                        </div>
                      </div>
                    </div>
                    
                    {/* User message */}
                    <div className="d-flex justify-content-end mb-4">
                      <div className="card bg-primary text-white" style={{maxWidth: '70%'}}>
                        <div className="card-body py-2 px-3">
                          <p className="mb-0">Thank you, Coach! I've been working on those aspects specifically. Any areas you think I could improve for the next match?</p>
                        </div>
                        <div className="card-footer bg-primary p-1 text-end border-0">
                          <small className="text-white-50">10:25 AM</small>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coach message */}
                    <div className="d-flex mb-4">
                      <img 
                        src="https://via.placeholder.com/36" 
                        className="rounded-circle me-2 align-self-start" 
                        alt="Coach Smith" 
                        width="36" 
                        height="36" 
                      />
                      <div className="card bg-light" style={{maxWidth: '70%'}}>
                        <div className="card-body py-2 px-3">
                          <p className="mb-0">Great performance in the last match! I was particularly impressed with your defensive work and how you tracked back to help the team.</p>
                        </div>
                        <div className="card-footer bg-light p-1 text-end">
                          <small className="text-muted">10:30 AM</small>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coach message with image */}
                    <div className="d-flex mb-4">
                      <img 
                        src="https://via.placeholder.com/36" 
                        className="rounded-circle me-2 align-self-start" 
                        alt="Coach Smith" 
                        width="36" 
                        height="36" 
                      />
                      <div>
                        <div className="card bg-light mb-1" style={{maxWidth: '70%'}}>
                          <div className="card-body py-2 px-3">
                            <p className="mb-0">I've attached a short video analysis of your movements. Take a look when you have time.</p>
                          </div>
                        </div>
                        <div className="img-preview rounded mb-1" style={{maxWidth: '200px', position: 'relative'}}>
                          <img src="https://via.placeholder.com/200x150" alt="Video preview" className="img-fluid rounded" />
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <button className="btn btn-light rounded-circle">
                              <i className="bi bi-play-fill"></i>
                            </button>
                          </div>
                        </div>
                        <small className="text-muted">10:32 AM</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message input area */}
                  <div className="p-3 border-top">
                    <div className="d-flex">
                      <button className="btn btn-light me-2">
                        <i className="bi bi-paperclip"></i>
                      </button>
                      <input type="text" className="form-control" placeholder="Type a message..." />
                      <button className="btn btn-primary ms-2">
                        <i className="bi bi-send-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
          
      case 'feedback':
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Feedback</h5>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="feedback-item">
                    <p><strong>Coach:</strong> {review.coach.dashboard[0].name}</p>
                    <p><strong>Ball Distribution:</strong> {review.ballDistributionR}</p>
                    <p><strong>Composure:</strong> {review.composureR}</p>
                    <p><strong>Dribbling:</strong> {review.dribblingR}</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No feedback to display</p>
              )}
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };
  
  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid bg-light py-4">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="m-0">TalentProfile</h4>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-bell"></i>
                </div>
                <div className="rounded-circle bg-secondary" style={{width: '40px', height: '40px'}}></div>
              </div>
            </div>
          </div>
          
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="list-group">
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleTabClick('profile')}
              >
                <i className="bi bi-person me-2"></i> Profile
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'approvals' ? 'active' : ''}`}
                onClick={() => handleTabClick('approvals')}
              >
                <i className="bi bi-check-circle me-2"></i> Approvals
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => handleTabClick('messages')}
              >
                <i className="bi bi-envelope me-2"></i> Messages
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'feedback' ? 'active' : ''}`}
                onClick={() => handleTabClick('feedback')}
              >
                <i className="bi bi-star me-2"></i> Feedback
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'scout-requirements' ? 'active' : ''}`}
                onClick={() => handleTabClick('scout-requirements')}
              >
                <i className="bi bi-clipboard-check me-2"></i> Scout Requirements
              </button>
            </div>
          </div>
          
          <div className="col-md-9">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
  // const renderMediaModal = () => {
  //   return (
  //     <Modal show={showMediaModal} onHide={() => setShowMediaModal(false)} centered>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Training highlights 2024</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <video controls style={{width: '100%'}}>
  //           <source src="/path/to/media/file.mp4" type="video/mp4" />
  //           Your browser does not support the video tag.
  //         </video>
  //       </Modal.Body>
  //     </Modal>
  //   );
  // };

  // return (
  //   <Container fluid className="bg-light p-0">
  //     {renderHeader()}
  //     <Row className="mx-0 mt-4">
  //       <Col xs={3} className="pl-0 pr-3">
  //         {renderSidebar()}
  //       </Col>
  //       <Col xs={9} className="pr-0 pl-3">
  //         {activeTab === 'profile' && renderProfileContent()}
  //         {activeTab === 'messages' && renderMessagesContent()}
  //         {activeTab === 'feedback' && renderFeedbackContent()}
  //       </Col>
  //     </Row>
     
  //     {renderMediaModal()}
  //   </Container>
  // );
  };


export default TalentProfile;