import { useState, useEffect } from 'react';
import { Bell, Calendar } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom'; // For redirection
import { useAuth } from '../auth/realAuthContext'; //for accessing possible logged in user

interface TalentsProps {
  userEmail: string;
  discipline: string;
}

const TalentDashboard: React.FC<TalentsProps> = ({ discipline }) => {

  const { user } = useAuth();  // Example: useAuth() from a context provider
  console.log('user:', user);
  const userEmail = user?.email; // Extract email safely
  console.log('userEmail: ', userEmail);

  // Fetch profile if present
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (!token) return;

    fetch('http://localhost:3000/talent/getProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data: ', data);
      if (data.profile) {
        navigate('/talent-profile'); // Redirect if profile exists
      } else {
        console.log('Profile not found');
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

  const isFormValid = () => {
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
    
    // Only require preferred foot for Football discipline
    if (discipline === 'Football' && !formData.preferredFoot) {
      return false;
    }
    
    return requiredFields;
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked'); // Debugging

    if (!isFormValid()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const token = localStorage.getItem('authToken'); // Retrieve the token
    console.log('token:: ', token);

    if (!token) {
      console.error('No token found');
      return; // Handle the error or show an alert to the user
    }

    try {
      const response = await fetch('http://localhost:3000/talent/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify(formData),
      });
      console.log('formData: ', formData); // Debugging formData

      if (!response.ok) {
        throw new Error('Failed to submit profile');
      }

      navigate('/talent-profile'); // Redirect to profile page after successful submission
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
          type: file.type,        // Set the file type (e.g., image/png)
          url: file.name,         // Use the file name as the URL or actual URL if uploading
          fileUrl: file.name,     // Add fileUrl field required by the server
          fileType: file.type     // Add fileType field required by the server
        }
      }));
      console.log('File selected:', file);
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

  


  return (
   <> 
   <Navbar></Navbar>
    <div className="container-fluid py-4 px-4 bg-light">
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h2 className="mb-0">Talent Dashboard</h2>
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-3 px-3 py-2 rounded-pill">{discipline} Talent</span>
                <div className="dropdown">
                  <Bell className="text-muted cursor-pointer" size={20} />
                </div>
                <img src="/api/placeholder/40/40" className="rounded-circle ms-3" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Your Talent Profile Section - Made narrower */}
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </> 
  );
};

export default TalentDashboard;