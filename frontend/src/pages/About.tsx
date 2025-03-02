import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar} from '../components/common/Navbar';
import {Footer} from '../components/common/Footer';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      {/* About Triple S section with navy blue background and white text */}
      <div className="bg-dark text-white py-5 text-center">
        <div className="container">
          <h1 className="mb-4">About Triple S</h1>
          
          <p className="lead mx-auto" style={{ maxWidth: '800px' }}>
            Triple S is a revolutionary talent discovery platform bridging the gap between exceptional
            talents in sports and arts with scouts worldwide. We leverage technology to create
            opportunities and foster growth in the sports and arts community.
          </p>
        </div>
      </div>
      
      {/* Mission and Vision section with normal background */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="bg-light p-4 h-100">
              <h3 className="mb-3">Our Mission</h3>
              <p>
                To democratize talent discovery by providing a global platform that
                connects promising talents with opportunities, ensuring no
                exceptional talent goes unnoticed.
              </p>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="bg-light p-4 h-100">
              <h3 className="mb-3">Our Vision</h3>
              <p>
                To become the world's leading platform for talent discovery, fostering
                a community where talents thrive and scouts find their next stars.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-5 text-center">
          <h2 className="mb-4">Meet Our Team</h2>
          
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="team-member">
                <div className="profile-image mb-3">
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="75" fill="#f8f9fa" />
                    <circle cx="75" cy="60" r="25" fill="#6c757d" />
                    <path d="M75,90 C45,90 25,110 25,140 L125,140 C125,110 105,90 75,90" fill="#6c757d" />
                  </svg>
                </div>
                <h4>Bevil Mulor</h4>
                <p className="text-muted">Chief Technology Officer</p>
                <div className="social-links">
                  <a href="#" className="me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                  <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Additional team members would go here */}
          </div>
        </div>
      </div>
      
      {/* Join Our Platform section with modified background color */}
      <div className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="mb-3">Join Our Platform</h2>
          <p className="mb-4">Be part of the future of sports talent development</p>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
