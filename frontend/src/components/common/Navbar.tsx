import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/realAuthContext';


export const Navbar: React.FC = () => {
  
    const { isLoggedIn, logout } = useAuth();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-dark" to="/">
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

        {/* Navigation Links - Centered */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/talents">Talents</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/coaches">Coaches</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/scouts">Scouts</Link>
            </li>
            
            {isLoggedIn && (
              <li className="nav-item px-3">
                <button className="btn btn-outline-danger" onClick={logout}>Log Out</button>
              </li>
            )}
            {/* Auth Buttons - Show Login/Signup only if not logged in */}
            {/* {!isLoggedIn && (
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </div>
            )} */}

          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="d-flex">
          <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          {/* <Link to="/admin-landing-page" className="btn btn-dark">Admin</Link> */}
        </div>
      </div>
    </nav>
  );
};
