import React from 'react';
import {Navbar} from '../components/common/Navbar';
import {Footer} from '../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Help: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">Help Center</h1>
          <p className="text-secondary">
            Find answers to common questions about using Triple S Talent platform
          </p>
        </div>

        <div className="row g-4">
          {/* Getting Started Section */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-25 p-2 rounded-circle me-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" className="text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="card-title h5 fw-semibold mb-0">Getting Started</h2>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">How do I create an account?</h3>
                  <p className="small text-secondary">
                    You can sign up an account by clicking the 'Sign Up' button and selecting your role (Talent, Coach, or Scout). Fill in your details to complete registration.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">What do I need for verification/profile?</h3>
                  <p className="small text-secondary">
                    Required documents vary by role. Talents need proof of age and identity, Coaches need certifications, and Scouts need organizational affiliation proof.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary fw-medium h6">How long does verification take?</h3>
                  <p className="small text-secondary">
                    Verification typically takes 24-48 hours. You'll receive email updates about your verification status.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Management Section */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-25 p-2 rounded-circle me-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" className="text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h2 className="card-title h5 fw-semibold mb-0">Account Management</h2>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">How do I update my profile?</h3>
                  <p className="small text-secondary">
                    Go to your profile settings, click "Edit Profile", and update your information. Don't forget to save changes.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">Can I change my role after signing up?</h3>
                  <p className="small text-secondary">
                    Role changes require admin approval. Contact support with your request and relevant documentation.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary fw-medium h6">How do I reset my password?</h3>
                  <p className="small text-secondary">
                    Click "Forgot Password" on the login page and follow the instructions sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Features Section */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-25 p-2 rounded-circle me-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" className="text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <h2 className="card-title h5 fw-semibold mb-0">Platform Features</h2>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">How do I connect with other users?</h3>
                  <p className="small text-secondary">
                    Use the search function to find users, view their profiles, and send connection requests. Messages can be sent once connections are established.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-primary fw-medium h6">How do I schedule meetings?</h3>
                  <p className="small text-secondary">
                    Use the calendar feature in your dashboard to propose meeting times with your connections.
                  </p>
                </div>

                <div>
                  <h3 className="text-primary fw-medium h6">Can I share my profile publicly?</h3>
                  <p className="small text-secondary">
                    Yes, you can generate a public profile link from your settings. You control what information is visible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-secondary mb-3">Still need help? <a href="#" className="text-primary text-decoration-none">Contact our support team</a></p>
          <button className="btn btn-dark">
            Contact Support
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
