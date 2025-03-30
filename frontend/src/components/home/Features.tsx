import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css'; // Import the CSS file for hover effect

const Features: React.FC = () => {
  return (
    <section className="features py-5">
      <div className="container">
        <div className="row g-4">
          {/* For Talents */}
          <div className="col-md-4">
            <Link to="/talents" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="card-body p-4 feature-card-bg">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-person-circle fs-2"></i>
                  </div>
                  <h3 className="h4 mb-3">For Talents</h3>
                  <p className="text-muted mb-3">
                    Upload content, track approvals, and receive feedback from top coaches.
                  </p>
                  <span className="text-decoration-none">
                    Learn More <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* For Coaches */}
          <div className="col-md-4">
            <Link to="/coaches" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="card-body p-4 feature-card-bg">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-clipboard-data fs-2"></i>
                  </div>
                  <h3 className="h4 mb-3">For Coaches</h3>
                  <p className="text-muted mb-3">
                    Review submissions, provide ratings, and manage your coaching profile.
                  </p>
                  <span className="text-decoration-none">
                    Learn More <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* For Scouts */}
          <div className="col-md-4">
            <Link to="/scouts" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="card-body p-4 feature-card-bg">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-search fs-2"></i>
                  </div>
                  <h3 className="h4 mb-3">For Scouts</h3>
                  <p className="text-muted mb-3">
                    Search talents, view ratings, and connect with promising individuals.
                  </p>
                  <span className="text-decoration-none">
                    Learn More <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;