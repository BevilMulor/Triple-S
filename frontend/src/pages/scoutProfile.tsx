import React from 'react';
import { useState, useEffect, SetStateAction } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../auth/realAuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Video, Pen } from 'lucide-react';
import { Modal } from 'react-bootstrap';
import { useApiUrl } from '../apiurl/ApiContext';

interface ScoutProfileProps {
  name?: string;
  roles?: string[];
  biography?: string;
  organization?: {
    club: string;
    location: string;
  };
  contactInfo?: {
    email: string;
    phone: string;
  };
  achievements?: string[];
  talentRequirements?: {
    position: string;
    ageGroup: string;
    description: string;
  }[];
}

const ScoutProfile: React.FC<ScoutProfileProps> = ()  => {    // Functions to handle modal open/close\
  const { user }= useAuth();
  const role= user?.role;
  const discipline= user?.discipline;
  const talentRequirements=user.talentRequirements;
  const email= user?.email;
  
  const navigate=useNavigate();
  const handleCloseModal = () => setShowMediaModal(false);
  const handleShowModal = () => setShowMediaModal(true);
  //const [edit,setEdit]=useState(Boolean)
  // Function to handle navigation to the coach form page
  const handleEditProfile = (userId:any, profileId:any) => {
    navigate('/scouts', { state: { isEditing: true, userId, profileId } }); 
};
const apiUrl = useApiUrl(); // Get the API URL from context




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
      const response = await fetch(`${apiUrl}/scout/deleteProfile`, {
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
  const [error, setError] = useState<string | null>(null)
  // Fetch profile data - updated to use the id from URL if available
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    
    const endpoint =`${apiUrl}/scout/getProfile`

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
        //console.log("profile data: ",data)
      })
      .catch((error) => {
        console.error('Error checking user profile:', error);
        setError('Failed to load profile');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Add id as a dependency

  // Loading and error handling before rendering content
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  // Handle tab click event
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleGoToScouts=()=>{
    navigate('/scout-profile')
  }

  console.log('profileData: ', profileData);
  console.log('talentRequirements form {user}: ', talentRequirements);
  return (
    <div className="scout-profile-container bg-light min-vh-100">
      {/* Navigation Header */}
      <div className="bg-dark text-white py-2 px-3 d-flex justify-content-between align-items-center">
        <button onClick = {handleGoToScouts} className="btn btn-link text-white text-decoration-none p-0">
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
                    alt={profileData[0]?.name || 'Scout'} 
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

            {/* Current Talent Requirements */}
            <div className="bg-white rounded shadow-sm p-3 mb-4">
              <h5 className="fw-bold mb-3">Current Talent Requirements</h5>
              
              {talentRequirements.map((requirement, index) => (
                <div key={index} className={`pb-3 ${index < talentRequirements.length - 1 ? 'border-bottom mb-3' : ''}`}>
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="mb-0 fw-bold text-primary">{requirement.position}</h6>
                    <div>
                      <button className="btn btn-sm text-secondary p-0 me-2">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm text-secondary p-0">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p className="mb-0 small text-secondary">{requirement.requirements}</p>
                </div>
              ))}
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

export default ScoutProfile;