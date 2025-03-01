import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faEdit, faCheckCircle, faStar, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const TalentProfile: React.FC = () => {
  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white py-2 px-4 shadow-sm mb-4" style={{ borderRadius: '0 0 15px 15px' }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="me-2 d-flex align-items-center justify-content-center rounded-circle bg-dark" style={{ width: '24px', height: '24px' }}>
              <FontAwesomeIcon icon={faUser} className="text-white" size="xs" />
            </div>
            <span className="fw-bold">TalentProfile</span>
          </a>
          <div className="d-flex align-items-center">
            <button className="btn btn-link position-relative me-3">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <div className="rounded-circle bg-secondary" style={{ width: '32px', height: '32px' }}></div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action d-flex align-items-center py-3 bg-light">
                  <FontAwesomeIcon icon={faUser} className="me-3" /> Profile
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-3" /> Approvals
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" /> Messages
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex align-items-center py-3">
                  <FontAwesomeIcon icon={faStar} className="me-3" /> Feedback
                </a>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="col-md-9">
            {/* Player Profile Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Player Profile</h5>
                  <button className="btn btn-primary btn-sm">
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Profile
                  </button>
                </div>
                
                <div className="row">
                  {/* Player info left column with avatar */}
                  <div className="col-md-3 d-flex flex-column align-items-center">
                    <div className="mb-3" style={{ width: '120px', height: '120px' }}>
                      <svg viewBox="0 0 120 120" className="rounded-circle img-fluid" style={{ backgroundColor: '#f8f9fa' }}>
                        <path d="M60 20 C70 20, 80 30, 80 40 C80 50, 70 60, 60 60 C50 60, 40 50, 40 40 C40 30, 50 20, 60 20 Z" fill="#333" />
                        <path d="M30 100 C30 80, 90 80, 90 100" stroke="#333" strokeWidth="8" fill="none" />
                      </svg>
                    </div>
                    
                    <div className="w-100 mt-4">
                      <div className="row">
                        <div className="col-6">
                          <p className="text-muted mb-0 small">Age</p>
                          <p className="mb-3">19</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted mb-0 small">Country</p>
                          <p className="mb-3">Rwanda</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-muted mb-0 small">Phone</p>
                          <p className="mb-0">+250790363376</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted mb-0 small">Preferred Foot</p>
                          <p className="mb-0">Right</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Player name right next to the avatar */}
                  <div className="col-md-3 d-flex flex-column justify-content-center">
                    <h5 className="mb-1">John Doe</h5>
                    <p className="text-muted">Forward / Striker</p>
                  </div>

                  {/* Player info right column */}
                  <div className="col-md-6 ps-4">
                    <div className="mb-3">
                      <p className="text-muted mb-1 small">Current Club</p>
                      <p className="mb-0">Local FC United</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-muted mb-1 small">Experience</p>
                      <p className="mb-0">Intermediate</p>
                    </div>

                    <div>
                      <p className="text-muted mb-2 small">Media Content</p>
                      <ul className="ps-3">
                        <li>Regional Championship Winner 2024</li>
                        <li>Top Scorer Award 2023</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-3">Recent Activity</h5>
                
                {/* Scout Approval Card */}
                <div className="card mb-3">
                  <div className="card-body py-2">
                    <div className="d-flex">
                      <div className="me-3 d-flex align-items-start justify-content-center mt-1">
                        <div className="bg-light rounded-circle p-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-dark" />
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-1">Scout Approval Received</h6>
                        <p className="mb-1">From Manchester United Scout</p>
                        <p className="text-muted small mb-0">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coach Feedback Card */}
                <div className="card mb-3">
                  <div className="card-body py-2">
                    <div className="d-flex">
                      <div className="me-3 d-flex align-items-start justify-content-center mt-1">
                        <div className="bg-light rounded-circle p-2">
                          <FontAwesomeIcon icon={faStar} className="text-dark" />
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-1">New Coach Feedback</h6>
                        <p className="mb-1">Rating: 4.5/5 - "Excellent ball control and vision"</p>
                        <p className="text-muted small mb-0">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New Message Card */}
                <div className="card">
                  <div className="card-body py-2">
                    <div className="d-flex">
                      <div className="me-3 d-flex align-items-start justify-content-center mt-1">
                        <div className="bg-light rounded-circle p-2">
                          <FontAwesomeIcon icon={faEnvelope} className="text-dark" />
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-1">New Message</h6>
                        <p className="mb-1">From Coach Williams</p>
                        <p className="text-muted small mb-0">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
