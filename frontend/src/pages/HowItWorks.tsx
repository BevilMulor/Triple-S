import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/common/Navbar';
import {Footer} from '../components/common/Footer';

const HowItWorks: React.FC = () => {
  return (
    <div className="how-it-works-page">
      <Navbar />
      
      {/* Container 1: Hero Section with Bootstrap dark background */}
      <div className="container-fluid bg-dark text-white py-5">
        <div className="container text-center py-4">
          <h1 className="mb-3 fw-bold">How It Works</h1>
          <p className="lead mb-3">Your journey to sports and arts excellence starts here</p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p>
                Triple S is a platform designed to bridge the gap between aspiring athletes, artists, coaches, and scouts. 
                Whether you are looking to showcase your talent, connect with opportunities, or grow your career in sports and arts, 
                our platform provides all the tools you need. Through verified profiles, smart matchmaking, and real-time updates, 
                we ensure that your journey is smooth, efficient, and impactful.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container 2: Feature Cards with white background */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <h2 className="text-center mb-4 fw-bold">Steps to Get Started</h2>
          <div className="row g-4">
            {/* Create Your Profile */}
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Create Your Profile</h5>
                  <p className="card-text">
                    Sign up as a talent, coach, or scout. Complete your profile with relevant experience and achievements.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Connect & Discover */}
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Connect & Discover</h5>
                  <p className="card-text">
                    Browse through profiles, find the right matches, and connect with potential opportunities.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Schedule & Meet */}
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Schedule & Meet</h5>
                  <p className="card-text">
                    Arrange meetings, trials, or training sessions through our platform.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Achieve Goals */}
            <div className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trophy" viewBox="0 0 16 16">
                      <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Achieve Goals</h5>
                  <p className="card-text">
                    Work together to reach milestones and advance in your sports career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container 3: Platform Features with light gray background */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-4">
          <h2 className="text-center mb-5 fw-bold">Platform Features</h2>
          
          <div className="row g-4">
            {/* Verified Profiles */}
            <div className="col-md-6">
              <div className="d-flex">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shield-check" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56"/>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <div>
                  <h5>Verified Profiles</h5>
                  <p>All users undergo verification to ensure authenticity and trust.</p>
                </div>
              </div>
            </div>
            
            {/* Real-time Updates */}
            <div className="col-md-6">
              <div className="d-flex">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                  </svg>
                </div>
                <div>
                  <h5>Real-time Updates</h5>
                  <p>Get instant notifications about matches, opportunities, and connections.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container 4: CTA Section with white background */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container text-center py-4">
          <h2 className="mb-3 fw-bold">Ready to Get Started?</h2>
          <p className="mb-4">Join our platform and take the next step in your sports journey</p>
          <Link to="/signup" className="btn btn-primary px-4 py-2">Join Now</Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;