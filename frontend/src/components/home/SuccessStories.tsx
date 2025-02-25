import React from 'react';

const SuccessStories: React.FC = () => {
  return (
    <section className="success-stories py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Success Stories</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary text-white p-3 me-3">
                    <i className="bi bi-person"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-0">John Smith</h5>
                    <p className="text-muted mb-0">Professional Athlete</p>
                  </div>
                </div>
                <p className="card-text">
                  "Triple S helped me connect with top coaches and scouts, launching my
                  professional career."
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary text-white p-3 me-3">
                    <i className="bi bi-person"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-0">Sarah Johnson</h5>
                    <p className="text-muted mb-0">Art Director</p>
                  </div>
                </div>
                <p className="card-text">
                  "The platform made it easy to showcase my work and get noticed by
                  industry professionals."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
