import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="hero bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center min-vh-75">
          <div className="col-lg-8 col-md-10 mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">
              Discover and Connect with Top Talent in Sports and Art
            </h1>
            <p className="lead mb-4">
              Your gateway to discovering exceptional talents and building meaningful
              connections in the world of sports and arts.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-primary btn-lg px-4">
                Get Started
              </button>
              <button className="btn btn-outline-light btn-lg px-4">
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
