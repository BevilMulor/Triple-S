import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row gy-4">
          {/* Brand Section */}
          <div className="col-12 col-md-4">
            <h5 className="text-white mb-3">Triple S</h5>
            <p className="text-white-50 mb-0">
              Connecting talents with opportunities in sports and arts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li><a href="/about" className="text-white-50 text-decoration-none">About Us</a></li>
              <li><a href="/how-it-works" className="text-white-50 text-decoration-none">How It Works</a></li>
              <li><a href="/success-stories" className="text-white-50 text-decoration-none">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-2">
            <h6 className="text-white mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li><a href="/help" className="text-white-50 text-decoration-none">Help Center</a></li>
              <li><a href="/contact" className="text-white-50 text-decoration-none">Contact Us</a></li>
              <li><a href="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-12 col-md-4">
            <h6 className="text-white mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top border-secondary mt-4 pt-4 text-center text-white-50">
          <small>© 2025 Triple S. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};
