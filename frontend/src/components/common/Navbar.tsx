import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Triple S
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/talents">Talents</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coaches">Coaches</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scouts">Scouts</Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
