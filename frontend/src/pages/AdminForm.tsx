import { useState, useEffect } from 'react';
import { Bell, Calendar } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useLocation } from 'react-router-dom';//edit
import { useNavigate } from 'react-router-dom'; // For redirection
import { useAuth } from '../auth/realAuthContext'; //for accessing possible logged in user
import { useApiUrl } from '../apiurl/ApiContext';

const  AdminForm=( )=>{

    const { user } = useAuth();  // Example: useAuth() from a context provider
    console.log('user:', user);
    
    

  //catering edit profile
  const location = useLocation();
  const isEditing = location.state?.isEditing || false; // Default to false if not passed
  //const userId = location.state?.userId || null;
  const userId = location.state?.userId || null;

  console.log("Editing state:", isEditing);
  //console.log("User ID:", userId);
  console.log("Profile ID:", userId);
  const [profileData, setProfileData] = useState<any>(null); // Store profile data here
  const apiUrl = useApiUrl(); // Get the API URL from context
  

  //edit route
  const fetchUserData = async ( userId: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("No token");
      return;
    }
    try {
      
    const response = await fetch(`${apiUrl}/admin/getAdminProfile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    const data = await response.json();
    //console.log('edit profile data:', data);

    if (data) {
      setProfileData(data); // Store the full profile data
      console.log('edit profile data in "profileData" variable:', profileData);
      setFormData({
        phoneNumber: data.phoneNumber || "",
        biography: data.biography || "",
        mediaContent: data.mediaContent?.[0] || {
          type: "",
          url: "",
          fileUrl: "",
          fileType: "",
        }
      })
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Fetch user data when in edit mode/ useEffect below fetch user data tohave access to it
useEffect(() => {
    console.log("useEffect triggered - isEditing:", isEditing, "userId:", userId);
    
    if (isEditing===true && userId) {
      console.log("Calling fetchUserData with userId:", userId);
      fetchUserData(userId);
    }
}, [isEditing, userId]);

// Fetch profile if present
useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (!token) return;

    fetch(`${apiUrl}/admin/getAdminProfile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data: ', data);
      console.log('isEditing state: ',isEditing);
      
      if (data.profile && isEditing===false) {
        console.log('fetched profile: ',data.profile,"isEditing: ",isEditing)
        navigate('/admin-profile'); // Redirect if profile exists
      } else {
        console.log('Profile not found/ If in Edit page, ignore');
      }
    })
    .catch((error) => {
      console.error('Error checking user profile:', error);
    });
  }, []);

  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState<{
    phoneNumber: string;
    biography: string;
    mediaContent: { 
      type: string;
      url: string;
      fileUrl: string;
      fileType: string;
    };
  }>({

    phoneNumber: '',
    biography: '',
    mediaContent: { 
      type: '',      // Initially empty or placeholder
      url: '',       // Initially empty or placeholder
      fileUrl: '',   // Initially empty or placeholder
      fileType: ''   // Initially empty or placeholder
    },
  });

  const [showAlert, setShowAlert] = useState(false);
 

  const isFormValid = () => {
    console.log('Checking form validity:', formData);
    const requiredFields = 
      formData.phoneNumber &&
      formData.biography &&
      formData.mediaContent.url &&
      formData.mediaContent.type &&
      formData.mediaContent.fileUrl &&
      formData.mediaContent.fileType;
  
    return requiredFields;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('')
    e.preventDefault();
    console.log('handleSubmit clicked');
  
    // Validate form data before submitting
    if (!isFormValid()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      // Use the form data from state, including fileUrl
      const response = await fetch(`${apiUrl}/admin/createAdminProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),  // Send form data including the file URL
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit profile');
      }
  
      navigate(`/admin-profile`);  // Redirect on success
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  //for edit page
const handleSubmitEdit = async (e: React.FormEvent) => {
    console.log('')
    e.preventDefault();
    console.log('handleSubmitEdit clicked');
  
    // Validate form data before submitting
    if (!isFormValid()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      // Use the form data from state, including fileUrl
      const response = await fetch(`${apiUrl}/admin/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),  // Send form data including the file URL
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit edit profile');
      }
  
      navigate(`/admin-profile`);  // Redirect on success
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      setFormData(prev => ({
        ...prev,
        mediaContent: {
          type: file.type,
          url: file.name,  // Placeholder for file name or URL
          fileUrl: file.name,
          fileType: file.type,
        },
      }));
  
      console.log('File selected:', file);
  
      // Prepare the FormData object to send the file and uploader info
      const fileData = new FormData();
      fileData.append('file', file);  // Ensure the file is appended
  
      // Ensure uploaderId and uploaderRole are being added
      fileData.append('uploaderId', '67d5a3c82f2af491bee1e29e');
      fileData.append('uploaderRole', 'Admin');
  
      // Send the file along with uploader info in the POST request
      fetch(`${apiUrl}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: fileData,  // Send file data in FormData
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to upload file');
          }
        })
        .then((data) => {
          if (data.fileUrl) {
            console.log('File uploaded successfully:', data.fileUrl);
            // After successful upload, update the formData with the correct file URL
            setFormData(prev => ({
              ...prev,
              mediaContent: {
                ...prev.mediaContent,
                fileUrl: data.fileUrl,  // Update with the actual URL from the server
              },
            }));
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };
  console.log('profileData: ',profileData);

  return (
    <> 
      <Navbar />
      <div className="container-fluid py-4 px-4 bg-light">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Admin Dashboard</h2>
                <div className="d-flex align-items-center">
                 
                  <div className="dropdown">
                    <Bell className="text-muted cursor-pointer" size={20} />
                  </div>
                  <img src="/api/placeholder/40/40" className="rounded-circle ms-3" alt="Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Rendering for Edit/Profile Form */}
        {isEditing ? (
          <div>
            <h2>Editing Profile</h2>
            {profileData ? (
              <form onSubmit={handleSubmitEdit} className="needs-validation" noValidate>
                {showAlert && (
                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <Bell className="me-2" />
                    <div>Please complete all required fields before submitting</div>
                  </div>
                )}

                {/* Phone Field */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={profileData.profile[0].phoneNumber}
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Biography*/}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Biography</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={profileData.profile[0].biography}
                      value={formData.biography}
                      onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Upload Media */}
                <div className="mb-4">
                  <label className="form-label">Upload Media</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*, video/*"
                  />
                </div>

                {/* Media Preview */}
                {formData.mediaContent.url || profileData.mediaContent?.url ? (
                  <div className="mt-3">
                    {formData.mediaContent.fileType?.startsWith("image/") || profileData.mediaContent?.fileType?.startsWith("image/") ? (
                      <img
                        src={formData.mediaContent.url || profileData.mediaContent.url}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: "200px" }}
                      />
                    ) : (
                      <video controls width="200">
                        <source src={formData.mediaContent.url || profileData.mediaContent.url} type={formData.mediaContent.fileType || profileData.mediaContent.fileType} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : null}

                <button type="submit" className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>
            ) : (
              <p>Loading user data...</p> 
            )}
          </div>
        ) : (
          <div className="row mb-4 justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="mb-4 border-bottom pb-2">Complete Your Admin Profile</h3>

                  <form onSubmit={handleSubmit} className="needs-validation" noValidate >
                    {showAlert && (
                      <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <Bell className="me-2" />
                        <div>Please complete all required fields before submitting</div>
                      </div>
                    )}

                    {/* Phone Fields */}
                    <div className="row mb-4">                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="Phone number e.g +250795111111"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Biography</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.biography}
                          onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                     {/* Upload Media */}
                      <div className="mb-4">
                        <label className="form-label">Upload Media</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileChange}
                          accept="image/*, video/*"
                          required
                        />
                      </div>

                      {/* Preview selected media */}
                      {formData.mediaContent.url && (
                        <div className="mt-3">
                          {formData.mediaContent.fileType.startsWith("image/") ? (
                            <img src={formData.mediaContent.url} alt="Preview" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                          ) : (
                            <video controls width="200">
                              <source src={formData.mediaContent.url} type={formData.mediaContent.fileType} />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      )}


                    <button type="submit" className="btn btn-primary w-100">
                      Submit Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminForm;