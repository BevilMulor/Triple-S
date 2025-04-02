import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonFill, BsShieldLockFill, BsBellFill } from 'react-icons/bs';
import { useAuth } from '../auth/realAuthContext';
import { useNavigate } from 'react-router-dom';
import { useApiUrl } from '../apiurl/ApiContext';

const AdminProfile: React.FC = () => {
  // const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  // const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const { user }= useAuth();
  const navigate= useNavigate();
  // Function to handle navigation to the coach form page
  const handleEditProfile = (userId:any) => {
    
    navigate('/admin-form', { state: { isEditing: true, userId } }); 
  };
  
  const apiUrl = useApiUrl(); // Get the API URL from context
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile if present
useEffect(() => {
  const token = localStorage.getItem('authToken'); // Retrieve the token
  if (!token) return;

  fetch(`${apiUrl}/admin/getAdminUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data: ', data);
    setUserData(data);
    setLoading(false);
    
    
    if (data) {
      console.log('fetched user: ',data,)
    
    } else {
      console.log('Something went wrong,no user ');
      
    }
  })
  .catch((error) => {
    console.error('Error checking user profile:', error);
  });
}, []);

if (loading) {
  return <p>Loading...</p>;  // Display a loading indicator
}

if (!userData) {
  return <p>No user data found.</p>;
}
const handleDeleteProfile= async ()=>{
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert("No token found");
    return;
  }

  if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/admin/deleteAdminUser`, {
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

}
 console.log('user data: ',userData);

 const handleGoToDashboard=()=>{
  navigate('/admin-dashboard');
 }

 const handleGoToHome=()=>{
  navigate('/');
 }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <svg width="24" height="24" fill="currentColor" className="bi bi-circle me-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </svg>
            Admin Profile
          </a>
          <div className="d-flex">
            <ul className="navbar-nav flex-row me-3">
              <li className="nav-item me-3">
                <button
                 className="btn btn-outline"
                 onClick={handleGoToDashboard}> 
                  <a className="nav-link" href="#">Dashboard</a>
                </button>
               
              </li>
              <li className="nav-item me-3">
                <button
                 className="btn btn-outline"
                 onClick={handleGoToHome}> 
                  <a className="nav-link" href="#">Home</a>
                </button>
               
              </li>
              
              
            </ul>
            <div className="d-flex align-items-center">
              <span className="text-white me-2">Admin</span>
              <div className="bg-light rounded-circle" style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BsPersonFill />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container my-4 flex-grow-1">
        <div className="row justify-content-center">
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-3">
                  {/* <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="120" fill="white"/>
                    <path d="M60 100C82.0914 100 100 82.0914 100 60C100 37.9086 82.0914 20 60 20C37.9086 20 20 37.9086 20 60C20 82.0914 37.9086 100 60 100Z" fill="white"/>
                    <path d="M80 95C80 95 78.5 80 60 80C41.5 80 40 95 40 95" fill="black"/>
                    <path d="M42 55C42 46.7157 48.7157 40 57 40H63C71.2843 40 78 46.7157 78 55V65C78 73.2843 71.2843 80 63 80H57C48.7157 80 42 73.2843 42 65V55Z" fill="black"/>
                    <path d="M59 65C59 65 63 70 70 65" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="52" cy="57" r="3" fill="white"/>
                    <circle cx="70" cy="57" r="3" fill="white"/>
                  </svg> */}
                </div>
                
                <div className="bg-white rounded shadow-sm p-3 mb-4 text-center">
                  <div className="position-relative d-inline-block">
                    <img 
                    src={userData?.user?.adminDashboard?.[0]?.mediaContent?.[0]?.fileUrl || 'https://via.placeholder.com/150'}
                    className="card-img-top rounded-circle" 
                    alt={userData?.user?.name || 'Admin'}
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  </div>
                </div>
              
                <h5 className="mb-1">{userData?.user.name}</h5>
                <p className="text-muted">System Administrator</p>
                
                <div className="list-group mt-4">
                  <a href="#" className="list-group-item list-group-item-action active d-flex align-items-center">
                    <BsPersonFill className="me-3" /> Profile
                  </a>
                  <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                    <BsShieldLockFill className="me-3" /> Security
                  </a>
                  <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                    <BsBellFill className="me-3" /> Notifications
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-8 col-lg-7">
            {/* Profile Information */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Profile Information</h5>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      value={userData?.user.name}
                    />
                  </div>
                  
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={userData?.user.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      value={userData?.user.adminDashboard[0].phoneNumber}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Biography</label>
                  <textarea 
                    className="form-control" 
                    id="bio" 
                    rows={3} 
                    value={userData?.user.adminDashboard[0].biography}
                  ></textarea>
                </div>

                <div className="d-flex mt-4">
                  <button onClick={()=>handleEditProfile(user?._id)} className="btn btn-light me-2">Edit Profile</button>
                  <button onClick={handleDeleteProfile} className="btn btn-light text-danger">Delete Profile</button>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            {/* <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Account Settings</h5>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <p className="text-muted mb-0 small">Add an extra layer of security to your account</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="twoFactorToggle" 
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Email Notifications</h6>
                    <p className="text-muted mb-0 small">Receive email updates about system activities</p>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="emailNotificationsToggle" 
                      checked={emailNotificationsEnabled}
                      onChange={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 px-4 mt-auto">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">© 2025 Admin Profile. All rights reserved.</p>
            <div>
              <a href="#" className="text-white me-3 text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-white text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminProfile;