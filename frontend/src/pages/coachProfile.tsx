import { useState, useEffect, SetStateAction } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Video, Pen } from 'lucide-react';
import { Modal } from 'react-bootstrap';
import { useApiUrl } from '../apiurl/ApiContext';

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

const CoachProfile =()=> {
    // Add the useNavigate hook for navigation
  const navigate = useNavigate();
  const { user }= useAuth();
  const role= user?.role;
  const discipline= user?.discipline;
  const talentReviews=user?.reviewsGiven;
  const email= user?.email;
  
  // Fixed useParams usage for React Router v6
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('profile');
  const [showMediaModal, setShowMediaModal] = useState(false); // Fixed duplicate declaration

   // For the feedback render
   const [reviews, setReviews] = useState<Review[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [edit,setEdit]=useState(Boolean)
   const [reviewedTalent,setReviewedTalent]=useState([]);
   const apiUrl = useApiUrl(); // Get the API URL from context

   // Functions to handle modal open/close
  const handleCloseModal = () => setShowMediaModal(false);
  const handleShowModal = () => setShowMediaModal(true);
  
  // Function to handle navigation to the coach form page
  const handleEditProfile = (userId:any, profileId:any) => {
    setEdit(true);
    navigate('/coaches', { state: { isEditing: true, userId, profileId } }); 
};





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
      const response = await fetch(`${apiUrl}/coach/deleteProfile`, {
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


  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data - updated to use the id from URL if available
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    
    const endpoint =`${apiUrl}/coach/getProfile`

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
        setReviewedTalent(data.reviewedTalent);
      })

      .catch((error) => {
        console.error('Error checking user profile:', error);
        setError('Failed to load profile');
        
      })
      .finally(() => {
        setLoading(false);
       
      
      
      });
  }, []); // Add id as a dependency
  
  const noProfile=()=>{
  
      console.log("no dashboard");
      navigate("/coaches");
    
  }

  if(profileData === null || profileData === undefined || profileData.length <= 0){
    noProfile()
  }
  // Loading and error handling before rendering content
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  // Handle tab click event
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const handleGoToCoaches=()=>{
    navigate('/coach-profile')
  }
  // useEffect(()=>{
  //   if(profileId === null){
  //     navigate('/coaches')
  //   }
  // })
 // Render tab content based on active tab
//  const renderTabContent = () => {
//     if (!profileData) {
//       navigate('/coaches')
//       return <p>No profile data available</p>;
    
//     }

//     console.log('profileData: ', profileData);
//     if (profileData && profileData[0].mediaContent) {

//       console.log('media content: ', profileData[0].mediaContent[0]);
//     }

//fixing media rendering
console.log('reviewedTalent: ',reviewedTalent)
console.log('profile data: ',profileData)

return (
  <div className="coach-profile-container bg-light min-vh-100">
    {/* Navigation Header */}
    <div className="bg-dark text-white py-2 px-3 d-flex justify-content-between align-items-center">
      <button onClick = {handleGoToCoaches} className="btn btn-link text-white text-decoration-none p-0">
        <i className="bi bi-arrow-left me-1"></i>
        Back to Dashboard
      </button>
      <div>
        <button 
                onClick={() => handleEditProfile(user?._id, profileData[0]?._id)}
                className="btn btn-outline-light btn-sm me-2">
          <i className="bi bi-pencil me-1"></i>
          Edit Profile
        </button>
        
      </div>
    </div>

    <div className="container py-4">
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-12 col-md-3">
          {/* Profile Image */}
          <div className="bg-white rounded shadow-sm p-3 mb-4 text-center">
            <div className="position-relative d-inline-block">
            <img 
                  src={profileData[0]?.mediaContent[0]?.fileUrl || '/api/placeholder/image.jpg'} 
                  className="card-img-top" 
                  alt={profileData[0]?.name || 'Coach'} 
                />
              {/* <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              /> */}
               <br/>
               
               <h6 className="mb-3 fw-bold">{profileData[0].name}</h6>
              <button className="btn btn-dark btn-sm position-absolute bottom-0 end-0 rounded-circle p-1">
                <i className="bi bi-camera"></i>
              </button>
            </div>
          </div>

          {/* Disciplines & Roles */}
          <div className="bg-white rounded shadow-sm p-3 mb-4">
            <h6 className="mb-3 fw-bold">Disciplines & Roles</h6>
            <div>
              
                <span  className="badge bg-light text-dark border me-1 mb-2 py-1 px-2" style={{ fontSize: "0.8rem" }}>
                  {discipline} {role}
                </span>
             
            </div>
          </div>

          {/* Organization */}
          {/* <div className="bg-white rounded shadow-sm p-3 mb-4">
            <h6 className="mb-3 fw-bold">Organization</h6>
            <p className="mb-2 small">
              <i className="bi bi-building me-2"></i>
              {organization.club}
            </p>
            <p className="mb-0 small">
              <i className="bi bi-geo-alt me-2"></i>
              {organization.location}
            </p>
          </div> */}

          {/* Contact Information */}
          <div className="bg-white rounded shadow-sm p-3 mb-4">
            <h6 className="mb-3 fw-bold">Contact Information</h6>
            <p className="mb-2 small">
              <i className="bi bi-envelope me-2"></i>
              {email}
            </p>
            <p className="mb-0 small">
              <i className="bi bi-telephone me-2"></i>
              {profileData[0].phoneNumber}
            </p>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded shadow-sm p-3">
            <h6 className="mb-3 fw-bold">Social Media</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-secondary">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-secondary">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-md-9">
          {/* Professional Information */}
          <div className="bg-white rounded shadow-sm p-3 mb-4">
            <h5 className="fw-bold mb-3">Professional Information</h5>
            
            <h6 className="fw-bold mb-2">Biography</h6>
            <p className="small text-dark">{profileData[0].biography}</p>
            
            <h6 className="fw-bold mt-4 mb-2">Experience</h6>
            <p className="small text-dark">{profileData[0].experience}</p>
            
            {/* <ul className="list-unstyled mb-0">
              {achievements.map((achievement, index) => (
                <li key={index} className="small mb-1">
                  <i className="bi bi-dot text-primary me-1"></i>
                  {achievement}
                </li>
              ))}
            </ul> */}
          </div>

          {/* Current coach reviews */}
              <div className="bg-white rounded shadow-sm p-3 mb-4">
                <h5 className="fw-bold mb-3">Current Coach Reviews</h5>

                {talentReviews.length > 0 ? (
                  talentReviews.map((review, index) => (
                    <div key={index} className={`pb-3 ${index < talentReviews.length - 1 ? 'border-bottom mb-3' : ''}`}>
                      <div className="mb-1">
                        <h5 className="mb-0 text-dark">{`Name: ${reviewedTalent[0].talent.dashboard[0].name}`}</h5>
                        <h6 className="mb-0 text-dark">{`Ball distribution: ${review.ballDistributionR}`}</h6>
                        <h6 className="mb-0 text-dark">{`Composure: ${review.composureR}`}</h6>
                        <h6 className="mb-0 text-dark">{`Dribbling: ${review.dribblingR}`}</h6>
                        <div>
                          <button className="btn btn-sm text-secondary p-0 me-2">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm text-secondary p-0">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p className="mb-0 medium text-dark">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews posted yet.</p> // Display this message when no reviews exist
                )}
              </div>

          {/* Account Security */}
          <div className="bg-white rounded shadow-sm p-3">
            <h5 className="fw-bold mb-3">Account Security</h5>
            <div className="d-grid gap-2">
              
              <button
              onClick={handleDeleteProfile}
              className="btn btn-light text-danger border d-flex align-items-center justify-content-center" type="button">
                <i className="bi bi-trash me-2"></i>
                <span>Delete Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  
  };


export default CoachProfile;