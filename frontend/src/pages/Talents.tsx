import { useState, useEffect } from 'react';
import { Bell, Calendar } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useLocation } from 'react-router-dom';//edit
import { useNavigate } from 'react-router-dom'; // For redirection
import { useAuth } from '../auth/realAuthContext'; //for accessing possible logged in user
import { useApiUrl } from '../apiurl/ApiContext';

// interface TalentsProps {
//   userEmail: string;
//   discipline: string;
// }

// const TalentDashboard: React.FC= ({ discipline }) => {
const TalentDashboard =()=>{

  const { user } = useAuth();  // Example: useAuth() from a context provider
  console.log('user:', user);
  const userEmail = user?.email; // Extract email safely
  const discipline= user?.discipline;
  console.log('userEmail: ', userEmail);
  

  //catering edit profile
  const location = useLocation();
  const isEditing = location.state?.isEditing || false; // Default to false if not passed
  //const userId = location.state?.userId || null;
  const profileId = location.state?.profileId || null;
  // useEffect(() => {
  //   if (profileId) {
  //     setIsEditing(true); // Automatically enter edit mode if profileId exists
  //   }
  // }, [profileId]); 

  console.log("Editing state:", isEditing);
  //console.log("User ID:", userId);
  console.log("Profile ID:", profileId);
  const [profileData, setProfileData] = useState<any>(null); // Store profile data here
  const apiUrl = useApiUrl(); // Get the API URL from context

   

  const fetchUserData = async ( profileId: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("No token");
      return;
    }
    try {
      
    const response = await fetch(`${apiUrl}/talent/getTalentProfile/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    const data = await response.json();
    //console.log('edit profile data:', data);

    if (data) {
      setProfileData(data.profile); // Store the full profile data
      console.log('edit profile data in "profileData" variable:', profileData);
      setFormData({
        name: data.name || "",
        phoneNumber: data.phoneNumber || "",
        dateOfBirth: data.dateOfBirth || "",
        country: data.country || "",
        position: data.position || "",
        experience: data.experience || "",
        currentClub: data.currentClub || "",
        preferredFoot: data.preferredFoot || "",
        mediaContent: data.mediaContent?.[0] || {
          type: "",
          url: "",
          fileUrl: "",
          fileType: "",
        },
        skills: data.skills || {}, 
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


// Fetch user data when in edit mode/ useEffect below fetch user data tohave access to it
useEffect(() => {
  console.log("useEffect triggered - isEditing:", isEditing, "profileId:", profileId);
  
  if (isEditing===true && profileId) {
    console.log("Calling fetchUserData with profileId:", profileId);
    fetchUserData(profileId);
  }
}, [isEditing, profileId]);


  // Fetch profile if present
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (!token) return;

    fetch(`${apiUrl}/talent/getProfile`, {
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
        navigate('/talent-profile'); // Redirect if profile exists
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
    name: string;
    phoneNumber: string;
    dateOfBirth: string;
    country: string;
    position: string;
    currentClub: string;
    preferredFoot: string;
    experience: string;
    mediaContent: { 
      type: string;
      url: string;
      fileUrl: string;
      fileType: string;
    };
    skills: { [key: string]: number };
  }>({
    name: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    position: '',
    currentClub: '',
    preferredFoot: '',
    experience: '',
    mediaContent: { 
      type: '',      // Initially empty or placeholder
      url: '',       // Initially empty or placeholder
      fileUrl: '',   // Initially empty or placeholder
      fileType: ''   // Initially empty or placeholder
    },
    skills: {}
  });

  const [showAlert, setShowAlert] = useState(false);

  const positions: { [key: string]: string[] } = {
    Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
    Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    Art: ['Musician', 'Painter', 'Sculptor']
  };

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const preferredFootOptions = ['Left', 'Right', 'Both'];

  const countries = [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '+250' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '+256' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '+255' },
    { code: 'BU', name: 'Burundi', flag: '🇧🇮', dialCode: '+257' },
    { code: 'SA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
  ];

  const getCountryByCode = (code: string) => {
    return countries.find(country => country.code === code) || null;
  };

  // Fixed function to correctly get positions for any discipline
  const getPositionsForDiscipline = () => {
    // Check if discipline exists in positions object (case-sensitive check)
    if (discipline && positions[discipline]) {
      return positions[discipline];
    }
    
    // Try case-insensitive matching as fallback
    const disciplineKey = Object.keys(positions).find(
      key => key.toLowerCase() === discipline.toLowerCase()
    );
    
    if (disciplineKey) {
      return positions[disciplineKey];
    }
    
    // Default to Basketball if discipline is not found at all
    console.log(`Discipline "${discipline}" not found in positions, defaulting to Basketball`);
    return positions['Basketball'];
  };

  // const isFormValid = () => {
  //   console.log('Checking form validity:', formData);
  //   const requiredFields = formData.name &&
  //     formData.phoneNumber &&
  //     formData.dateOfBirth &&
  //     formData.country &&
  //     formData.position &&
  //     formData.currentClub &&
  //     formData.experience &&
  //     formData.mediaContent.url &&
  //     formData.mediaContent.type &&
  //     formData.mediaContent.fileUrl &&
  //     formData.mediaContent.fileType;
  
  //   // Only require preferred foot for Football discipline
  //   if (discipline === 'Football' && !formData.preferredFoot) {
  //     return false;
  //   }
  
  //   return requiredFields;
  // };
  const isFormValid = () => {
    console.log('Checking form validity:', formData);
    const requiredFields = formData.name &&
      formData.phoneNumber &&
      formData.dateOfBirth &&
      formData.country &&
      formData.position &&
      formData.currentClub &&
      formData.experience &&
      formData.mediaContent.url &&
      formData.mediaContent.type &&
      formData.mediaContent.fileUrl &&
      formData.mediaContent.fileType;
  
    // Ensure Preferred Foot is required for Football only (case-insensitive check)
    if (discipline?.toLowerCase() === 'football' && !formData.preferredFoot) {
      console.log('Preferred Foot is required for Football');
      return false;
    }
  
    return requiredFields;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await fetch(`${apiUrl}/talent/createProfile`, {
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
  
      navigate(`/talent-profile`);  // Redirect on success
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
    const response = await fetch(`${apiUrl}/talent/EditProfile`, {
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

    navigate(`/talent-profile`);  // Redirect on success
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
    fileData.append('uploaderRole', 'Coach');

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
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      // Reset phone when country changes
      phoneNumber: countryCode ? '' : prev.phoneNumber
    }));
  };

  // Reset position when discipline changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      position: '' // Reset position when discipline changes
    }));
  }, [discipline]);

  return (
   <> 
   <Navbar></Navbar>
    <div className="container-fluid p-0">
      
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="card shadow-sm" style={{
            backgroundColor: '#212529', 
            borderRadius: '0.5 rem',
          }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="mb-0 text-white">Talent Dashboard</h2>
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-primary me-3 px-3 py-2 rounded-pill">{discipline} Talent</span>
                <div className="dropdown">
                  <Bell className="text-white cursor-pointer" size={20} />
                </div>
                <img src="/api/placeholder/40/40" className="rounded-circle ms-3" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Complete Your Talent Profile Section - Made narrower */}
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

    {/* Name and Phone fields */}
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder={profileData.name}
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <div className="input-group">
            {formData.country && (
              <span className="input-group-text">
                {getCountryByCode(formData.country)?.flag} {getCountryByCode(formData.country)?.dialCode}
              </span>
            )}
            <input
              type="text"
              className="form-control"
              placeholder={profileData.phoneNumber}
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              required
            />
          </div>
        </div>
      </div>
    </div>

    {/* Date of Birth and Country */}
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={formData.dateOfBirth || profileData.dateOfBirth}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Country</label>
          <select
            className="form-select"
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">{profileData.country || "Select Country"}</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    {/* Position and Experience */}
    <div className="row mb-4">
      <div className="col-md-6">
        <label className="form-label">Position</label>
        <select
          className="form-select"
          value={formData.position}
          onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
          required
        >
          <option value="">{profileData.position || "Select Position"}</option>
          {positions[discipline]?.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Experience Level</label>
        <select
          className="form-select"
          value={formData.experience}
          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
          required
        >
          <option value="">{profileData.experience || "Select Experience Level"}</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Current Club and Preferred Foot */}
    <div className="row mb-4">
      <div className="col-md-6">
        <label className="form-label">Current Club</label>
        <input
          type="text"
          className="form-control"
          placeholder={profileData.currentClub}
          value={formData.currentClub}
          onChange={(e) => setFormData(prev => ({ ...prev, currentClub: e.target.value }))}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Preferred Foot</label>
        <select
          className="form-select"
          value={formData.preferredFoot}
          onChange={(e) => setFormData(prev => ({ ...prev, preferredFoot: e.target.value }))}
          required={discipline === 'Football'}
          disabled={discipline !== 'Football'}
        >
          <option value="">{profileData.preferredFoot || "Select Preferred Foot"}</option>
          {preferredFootOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
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
      <p>Loading user data...</p>  // Handles the case when userData isn't available yet
    )}
  </div>
) : (
  <div className="row mb-4 justify-content-center">
    <div className="col-12 col-md-8 col-lg-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4 border-bottom pb-2">Complete Your Talent Profile</h3>

          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            {showAlert && (
              <div className="alert alert-warning d-flex align-items-center" role="alert">
                <Bell className="me-2" />
                <div>Please complete all required fields before submitting</div>
              </div>
            )}

            {/* Name and Phone fields using Bootstrap grid */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    {formData.country && (
                      <span className="input-group-text">
                        {getCountryByCode(formData.country)?.flag} {getCountryByCode(formData.country)?.dialCode}
                      </span>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date of Birth and Country */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    value={formData.country}
                    onChange={handleCountryChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Position and Experience Level */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Position</label>
                <select
                  className="form-select"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  required
                >
                  <option value="">Select Position</option>
                  {positions[discipline]?.map((position) => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Experience Level</label>
                <select
                  className="form-select"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  required
                >
                  <option value="">Select Experience Level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Club and Preferred Foot */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Current Club</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.currentClub}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentClub: e.target.value }))}
                  placeholder="Enter your current club"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Preferred Foot</label>
                <select
                  className="form-select"
                  value={formData.preferredFoot}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredFoot: e.target.value }))}
                  required={discipline === 'Football'}
                  disabled={discipline !== 'Football'}
                >
                  <option value="">Select Preferred Foot</option>
                  {preferredFootOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
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

export default TalentDashboard;