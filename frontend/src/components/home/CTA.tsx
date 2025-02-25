import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <section className="cta py-5 bg-primary text-white">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="mb-4">Ready to Get Started?</h2>
            <p className="lead mb-4">
              Join our community of talents, coaches, and scouts to unlock new opportunities.
            </p>
            <button 
              className="btn btn-light btn-lg px-4"
              onClick={handleNavigateToSignup}
            >
              Create Your Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
