import React from 'react';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            🏆 Triple 5
          </a>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="/talents">Talents</a>
            <a className="nav-link" href="/coaches">Coaches</a>
            <a className="nav-link" href="/scouts">Scouts</a>
            <a className="nav-link" href="/login">Login</a>
            <a className="btn btn-dark ms-2" href="/signup">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                Discover and Connect with Top Talent in Sports and Art
              </h1>
              <p className="lead mb-4">
                Your gateway to discovering exceptional talents and building meaningful
                connections in the world of sports and arts.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-primary px-4">Get Started</button>
                <button className="btn btn-outline-light px-4">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-person-circle fs-2 mb-3"></i>
                  <h3 className="h5">For Talents</h3>
                  <p className="text-muted">
                    Upload content, track approvals, and receive feedback from top coaches.
                  </p>
                  <a href="/learn-more" className="text-decoration-none">Learn More →</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-clipboard-check fs-2 mb-3"></i>
                  <h3 className="h5">For Coaches</h3>
                  <p className="text-muted">
                    Review submissions, provide ratings, and manage your coaching profile.
                  </p>
                  <a href="/learn-more" className="text-decoration-none">Learn More →</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-search fs-2 mb-3"></i>
                  <h3 className="h5">For Scouts</h3>
                  <p className="text-muted">
                    Search talents, view ratings, and connect with promising individuals.
                  </p>
                  <a href="/learn-more" className="text-decoration-none">Learn More →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Success Stories</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-dark text-white p-3 me-3">
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">John Smith</h5>
                      <small className="text-muted">Professional Athlete</small>
                    </div>
                  </div>
                  <p className="text-muted">
                    "Triple 5 helped me connect with top coaches and scouts, launching my
                    professional career."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-dark text-white p-3 me-3">
                      <i className="bi bi-person"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Sarah Johnson</h5>
                      <small className="text-muted">Art Director</small>
                    </div>
                  </div>
                  <p className="text-muted">
                    "The platform made it easy to showcase my work and get noticed by
                    industry professionals."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-muted mb-4">
            Join our community of talents, coaches, and scouts to unlock new opportunities.
          </p>
          <button className="btn btn-dark px-4 py-2">Create Your Account</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Triple 5</h5>
              <p className="small">
                Connecting talents with opportunities in sports and arts.
              </p>
            </div>
            <div className="col-md-2">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li><a href="/how-it-works" className="text-white-50">How It Works</a></li>
                <li><a href="/about" className="text-white-50">About Us</a></li>
                <li><a href="/success" className="text-white-50">Success Stories</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6>Support</h6>
              <ul className="list-unstyled">
                <li><a href="/help" className="text-white-50">Help Center</a></li>
                <li><a href="/contact" className="text-white-50">Contact Us</a></li>
                <li><a href="/privacy" className="text-white-50">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6>Follow Us</h6>
              <div className="d-flex gap-2">
                <a href="#" className="text-white-50"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white-50"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary mt-4 pt-4 text-center">
            <small className="text-white-50">© 2025 Triple 5. All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Dashboard;
