import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button, Modal } from 'react-bootstrap';
import { Bell, User, MessageCircle, Star, Video } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TalentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [userRole] = useState<string>('coach');

  const renderHeader = () => {
    return (
      <Nav className="navbar navbar-light bg-white">
        <Container fluid className="d-flex justify-content-between align-items-center px-0">
          <Nav.Item>
            <h4 className="navbar-brand mb-0">  Talent Profile</h4>
          </Nav.Item>
          <Nav.Item className="d-flex align-items-center">
            <div className="me-3 position-relative">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </div>
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
              style={{width: '40px', height: '40px'}}
            >
              <User size={20} color="white" />
            </div>
          </Nav.Item>
        </Container>
      </Nav>
    );
  };

  const renderSidebar = () => {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
                className="d-flex align-items-center px-3 py-2"
              >
                <User size={20} className="me-2" />
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'messages'}
                onClick={() => setActiveTab('messages')}
                className="d-flex align-items-center px-3 py-2"
              >
                <MessageCircle size={20} className="me-2" />
                Messages
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === 'feedback'}
                onClick={() => setActiveTab('feedback')}
                className="d-flex align-items-center px-3 py-2"
              >
                <Star size={20} className="me-2" />
                Feedback
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
      </Card>
    );
  };

  const renderProfileContent = () => {
    // Calculate age from date of birth
    const calculateAge = (dateOfBirth: string) => {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
     
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
     
      return age;
    };

    return (
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="card-title mb-1">John Doe</h5>
              <p className="text-muted">Striker</p>
            </div>
            <Button variant="outline-primary" size="sm">
              Edit Profile
            </Button>
          </div>
         
          <Row>
            <Col md={6}>
              <div className="profile-details">
                <p><strong>Phone:</strong> +254 712 345 678</p>
                <p><strong>Age:</strong> {calculateAge('2005-03-15')}</p>
                <p><strong>Country:</strong> KE</p>
                <p><strong>Current Club:</strong> Local FC United</p>
                <p><strong>Experience Level:</strong> Intermediate</p>
                <p><strong>Preferred Foot:</strong> Right</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="media-content">
                <div className="d-flex align-items-center">
                  <Video size={40} className="me-3 text-primary" />
                  <div>
                    <h6 className="mb-1">Training highlights 2024</h6>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setShowMediaModal(true)}
                    >
                      View Media
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const renderMessagesContent = () => {
    const contacts = [
      { id: '1', name: 'Coach Smith', lastMessage: 'Great performance last week!', unread: 2 },
      { id: '2', name: 'Team Manager', lastMessage: 'Contract details discussed', unread: 1 },
      { id: '3', name: 'Scout Davis', lastMessage: 'Interested in your progress', unread: 0 }
    ];

    const messages = [
      { sender: 'Coach Smith', text: 'Hi John, how are you feeling after the last match?', time: '2:30 PM' },
      { sender: 'You', text: 'I\'m doing well, feeling strong and ready for the next game.', time: '2:35 PM' }
    ];

    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="d-flex">
          {/* Contact List */}
          <div className="border-end pe-3" style={{ width: '300px' }}>
            <h5 className="mb-3">Messages</h5>
            {contacts.map(contact => (
              <div
                key={contact.id}
                className={d-flex align-items-center p-2 mb-2 ${selectedChat === contact.id ? 'bg-light' : ''}}
                onClick={() => setSelectedChat(contact.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <strong>{contact.name}</strong>
                    {contact.unread > 0 && (
                      <span className="badge bg-primary rounded-circle">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <small className="text-muted">{contact.lastMessage}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          {selectedChat && (
            <div className="flex-grow-1 ps-3 d-flex flex-column">
              <div className="flex-grow-1 overflow-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={mb-2 ${msg.sender === 'You' ? 'text-end' : 'text-start'}}
                  >
                    <div
                      className={`d-inline-block p-2 rounded ${
                        msg.sender === 'You' ? 'bg-primary text-white' : 'bg-light'
                      }`}
                    >
                      {msg.text}
                      <small className="d-block text-muted mt-1">{msg.time}</small>
                    </div>
                  </div>
                ))}
              </div>
             
              {/* Message Input */}
              <div className="mt-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                  />
                  <Button variant="primary">Send</Button>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderFeedbackContent = () => {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="mb-4">Rate Talent</h5>
          <div className="mb-3">
            <p>Overall Rating</p>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: userRole === 'coach' ? 'pointer' : 'default',
                    fontSize: '24px',
                    color: star <= 2 ? '#FFD700' : '#e4e5e9'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="rating-criteria mb-3">
            {['Ball Distribution', 'Composure', 'Dribbling'].map((skill) => (
              <div key={skill} className="d-flex justify-content-between align-items-center mb-2">
                <span>{skill}</span>
                <select
                  className="form-select form-select-sm w-auto"
                  disabled={userRole !== 'coach'}
                >
                  <option>Select Rating</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="coach-comments">
            <textarea
              className="form-control mb-3"
              placeholder="Provide your feedback on this talent's performance, strengths, and areas for improvement"
              rows={4}
              disabled={userRole !== 'coach'}
            ></textarea>
            {userRole === 'coach' && (
              <Button variant="primary" className="w-100">
                Submit Ratings & Comments
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderMediaModal = () => {
    return (
      <Modal show={showMediaModal} onHide={() => setShowMediaModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Training highlights 2024</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video controls style={{width: '100%'}}>
            <source src="/path/to/media/file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Container fluid className="bg-light p-0">
      {renderHeader()}
      <Row className="mx-0 mt-4">
        <Col xs={3} className="pl-0 pr-3">
          {renderSidebar()}
        </Col>
        <Col xs={9} className="pr-0 pl-3">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'messages' && renderMessagesContent()}
          {activeTab === 'feedback' && renderFeedbackContent()}
        </Col>
      </Row>
     
      {renderMediaModal()}
    </Container>
  );
};

export default TalentProfile;



LOGIN COMPONENT
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../auth/realAuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';//redirecting user

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; role?: string }>({});
  const [loading, setLoading] = useState(false);

  const roles = ['Talent', 'Coach', 'Scout'];

  const navigate = useNavigate()//initialise navigate


  const validateForm = () => {
    const newErrors: { email?: string; password?: string; role?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 

  const { login } = useAuth();//implementing session store/ realauthcontext
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Start loading state

      const { email, password, role } = formData;

      let apiUrl = "http://www.localhost:3000"; // Ensure this is correctly formatted
      if (role === "Talent") {
        apiUrl += "/auth/talentLogin";
      } else if (role === "Coach") {
        apiUrl += "/auth/coachLogin";
      } else if (role === "Scout") {
        apiUrl += "/auth/scoutLogin";
      } else {
        console.error("Invalid role selected");
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error(HTTP error! Status: ${response.status});
        }

        const result = await response.json();
        if (role === "Talent") {
          navigate('/talents');
        } else if (role === "Coach") {
          navigate('/coaches');
        } else if (role === "Scout") {
          navigate('/scouts');
        } else {
          console.error("Invalid role selected");
          return;
        }
        console.log('Login successful:', result);
       

        login(result.token, result.user); // Call login function to set the user session

        // Save JWT token to localStorage or sessionStorage
        //localStorage.setItem('authToken', result.token); // Adjust according to your API response
        console.log('user: ',result.user.role)
        //localStorage.setItem('userRole', result.user.role);

        alert('Login successful!');
        // Optionally, redirect or perform further actions after login

      } catch (error) {
        console.error('Login failed:');
        alert('Login failed. Please try again.');
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="needs-validation">
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className={form-control ${errors.email ? 'is-invalid' : ''}}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={form-control ${errors.password ? 'is-invalid' : ''}}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              name="role"
              id="role"
              className={form-select ${errors.role ? 'is-invalid' : ''}}
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && (
              <div className="invalid-feedback d-flex align-items-center">
                <AlertCircle className="me-1" size={16} />
                {errors.role}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: '#001f3f' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
