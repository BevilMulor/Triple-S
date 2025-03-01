import { useState } from 'react';
import { Bell, Calendar } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TalentsProps {
  userEmail: string;
  discipline: string;
}

const TalentDashboard: React.FC<TalentsProps> = ({ discipline }) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    dateOfBirth: string;
    country: string;
    position: string;
    currentClub: string;
    experienceLevel: string;
    mediaUrl: string;
    skills: { [key: string]: number };
  }>({
    name: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    position: '',
    currentClub: '',
    experienceLevel: '',
    mediaUrl: '',
    skills: {}
  });

  const [showAlert, setShowAlert] = useState(false);

  const positions: { [key: string]: string[] } = {
    Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
    Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    Art: ['Musician', 'Painter', 'Sculptor']
  };

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const countries = [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '+250' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '+256' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '+255' },
    { code: 'BU', name: 'Burundi', flag: '🇧🇮', dialCode: '+257' },
    { code: 'SA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
  ];

  const skillsTemplate: { [key: string]: { all: string[] } } = {
    Football: {
      all: ['Ball Distribution', 'Composure', 'Dribbling']
    },
    Basketball: {
      all: ['Ball Handling', 'Court Vision', 'Shooting']
    },
    Art: {
      all: ['Creativity', 'Technical Skill', 'Composition']
    }
  };

  const getCountryByCode = (code: string) => {
    return countries.find(country => country.code === code) || null;
  };

  const isFormValid = () => {
    const requiredFields = formData.name && 
                         formData.phone && 
                         formData.dateOfBirth &&
                         formData.country &&
                         formData.position && 
                         formData.currentClub &&
                         formData.experienceLevel &&
                         formData.mediaUrl;
    return requiredFields;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isFormValid()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        mediaUrl: file.name
      }));
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      // Reset phone when country changes
      phone: countryCode ? '' : prev.phone
    }));
  };

  return (
    <div className="container-fluid py-4 px-4 bg-light">
      {/* Navbar */}
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

      {/* Complete Your Talent Profile Section - Narrower form */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
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
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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

                {/* Media Upload */}
                <div className="mb-4">
                  <div className="border border-2 border-dashed rounded-3 p-5 text-center bg-light">
                    <input
                      type="file"
                      className="d-none"
                      id="mediaUpload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="mediaUpload" className="btn btn-primary">
                      Choose Files
                    </label>
                    {formData.mediaUrl && <p className="mt-2">{formData.mediaUrl}</p>}
                  </div>
                </div>

                {/* Position, Current Club and Experience Level */}
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
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                      required
                    >
                      <option value="">Select Experience Level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Added Current Club Row */}
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
                    {/* This column intentionally left empty to match the requested layout */}
                  </div>
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

      {/* View-only display of the Coach Rating Card (pulled from Coach Dashboard) - Also narrower */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Coach Ratings (View Only)</h5>
              <div className="alert alert-secondary">
                <p className="mb-0">Your profile ratings will appear here after coaches have evaluated your performance. 
                Coaches will rate your overall performance as well as specific skills based on your discipline.</p>
              </div>
              

              <div className="mb-3">
                <label className="form-label">Overall Rating (Coach Assessed)</label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      style={{ fontSize: '24px', color: star <= 3 ? '#ffc107' : '#e4e5e9', opacity: 0.7 }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="row">
                {skillsTemplate[discipline]?.all.map((skill) => (
                  <div className="col-md-4 mb-3" key={skill}>
                    <label className="form-label">{skill} (Coach Assessed)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Awaiting coach evaluation"
                      disabled
                    />
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label className="form-label">Coach Comments</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Coach feedback will appear here after evaluation"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;
