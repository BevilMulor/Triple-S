import { useState, useEffect, SetStateAction } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';

const TalentProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // For the feedback render
  interface Requirement {
    _id: string;
    position: string;
    requirements: string;
    scout: {
      name: string;
      email: string;
    };
  }

  const [requirements, setRequirements] = useState<Requirement[]>([]); // scout
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const { user } = useAuth(); // Assuming useAuth() provides the user data

  useEffect(() => {
    if (user && user.review) {
      // Check if the review is an array or an object, then convert to an array
      setReviews(Array.isArray(user.review) ? user.review : Object.values(user.review || []) as any[]);
    }
  }, [user]); // Update reviews when user data changes

  interface Profile {
    profile: {
      name: string;
      currentClub: string;
      experience: string;
      mediaContent: { fileUrl: string }[];
    }[];
  }

  const [profileData, setProfileData] = useState<Profile | null>(null); // Initialize profile as null
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  // Fetch profile data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false); // Token missing, set loading false immediately
      return;
    }

    fetch('http://localhost:3000/talent/getProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error('Error checking user profile:', error);
        setError('Failed to load profile');
      })
      .finally(() => {
        setLoading(false); // End loading after fetching data
      });
  }, []);

  // Fetch talent requirements
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch("http://localhost:3000/scout/getRequirements");
        if (!response.ok) {
          throw new Error("Failed to fetch requirements");
        }
        const data = await response.json();
        setRequirements(data.talentRequirements || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Set error message if there's a failure
        } else {
          setError('An unknown error occurred');
        }
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

  // Rating form component for the profile page
  const RatingForm = () => {
    const { user } = useAuth();  // Example: useAuth() from a context provider
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
    console.log('profileData: ',profileData);
    console.log('media content: ', profileData?.profile?.[0]?.mediaContent?.[0])
    console.log('reviews/feedback: ',reviews, 'reviews.length: ', reviews.length);
    console.log('requirements: ',requirements);
    
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className="card">
  <div className="card-body">
    <h6 className="text-muted">Name</h6>
    <p className="mb-4">{profileData?.profile?.[0]?.name || "N/A"}</p>
    <h6 className="text-muted">Current Club</h6>
    <p className="mb-4">{profileData?.profile?.[0]?.currentClub || "N/A"}</p>
    <h6 className="text-muted">Experience</h6>
    <p className="mb-4">{profileData?.profile?.[0]?.experience || "No experience listed"}</p>

    <h6 className="text-muted">Media Content</h6>
    {profileData?.profile?.[0]?.mediaContent && profileData.profile[0].mediaContent.length > 0 ? (
        <ul>
          
          {/* <li>File URL: 
            <img 
              src={profileData.profile[0].mediaContent[0].fileUrl} 
              alt="Uploaded Media" 
              style={{ width: "200px", height: "auto", marginTop: "10px" }} 
              onError={(e) => e.currentTarget.src = "fallback-image-url.jpg"} // Optional fallback image
            />
          </li> */}
         
        </ul>
      ) : (
      <p>No media content available</p>
    )}
  </div>
</div>

            
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
          console.log('requirements data: ', requirements); // Debugging line to check data
          return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Scout Requirements</h5>
                {requirements ? (
                    <ul>
                      <li>Test Content: Scout Requirements Loaded</li>
                      {/* Your rendering logic here */}
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
                        <strong>Scout Email:</strong> {req.scout?.email || "N/A"}
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
                          <div className="img-preview rounded mb-1" style={{maxWidth: '200px'}}>
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
                  <p><strong>Coach:</strong> {review.coach.name}</p>
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
              <i className="bi bi-star me-2"></i> Scout Requirements
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
};

export default TalentProfile;