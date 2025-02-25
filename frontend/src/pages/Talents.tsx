import { useState } from 'react';
import { Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TalentsProps {
  userEmail: string;
  discipline: string;
}

const TalentDashboard: React.FC<TalentsProps> = ({ discipline }) => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    position: string;
    mediaUrl: string;
    skills: { [key: string]: number };
  }>({
    name: '',
    phone: '',
    position: '',
    mediaUrl: '',
    skills: {}
  });

  const [showAlert, setShowAlert] = useState(false);
  const [] = useState({
    rating: 0,
    comments: ''
  });

  const positions: { [key: string]: string[] } = {
    Football: ['Goalkeeper', 'Defense', 'Midfield', 'Striker'],
    Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    Art: ['Musician', 'Painter', 'Sculptor']
  };

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

  const handleSkillChange = (skill: string, value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 1 && numValue <= 10) {
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skill]: numValue
        }
      }));
    }
  };

  const isFormValid = () => {
    const requiredFields = formData.name && 
                         formData.phone && 
                         formData.position && 
                         formData.mediaUrl;
    const skillsFilled = Object.keys(formData.skills).length === skillsTemplate['Football'].all.length;
    return requiredFields && skillsFilled;
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

      {/* Complete Your Talent Profile Section */}
      <div className="row mb-4">
        <div className="col-12">
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
                      <input
                        type="text"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
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

                {/* Position Selection using Bootstrap form-select */}
                <div className="mb-4">
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

                {/* Skills Rating */}
                <div className="mb-4">
                  <h4 className="mb-3">Skills Rating</h4>
                  {skillsTemplate[discipline]?.all.map(skill => (
                    <div key={skill} className="mb-3">
                      <label className="form-label d-flex justify-content-between">
                        {skill}
                        <span className="text-muted">(1-10)</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="10"
                        value={formData.skills[skill] || ''}
                        onChange={(e) => handleSkillChange(skill, e.target.value)}
                        required
                      />
                    </div>
                  ))}
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
  );
};

export default TalentDashboard;
