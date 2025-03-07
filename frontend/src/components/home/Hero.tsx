import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLearnMore = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="hero bg-dark text-white" style={{ minHeight: '90vh', paddingTop: '10vh', paddingBottom: '10vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            <h1 className="display-3 fw-bold mb-4">
              Discover and Connect with Top Talent in Sports and Art
            </h1>
            <p className="lead mb-5">
              Your gateway to discovering exceptional talents and building meaningful 
              connections in the world of sports and arts.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn btn-primary btn-lg px-4"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              <button 
                className="btn btn-outline-light btn-lg px-4"
                onClick={handleLearnMore}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
