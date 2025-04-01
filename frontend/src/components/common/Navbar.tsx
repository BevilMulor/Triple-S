import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/realAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export const Navbar: React.FC = () => {
  
    const { isLoggedIn, logout, user } = useAuth();
      
      console.log('user:', user)
      const [isAdmin,setIsAdmin] = useState(Boolean)

      useEffect(() => {
        if (user?.role === "Admin") {
            setIsAdmin(true);
        }
    }, [user]); // Runs only when `user` changes
      console.log('isAdmin:', isAdmin);
      
    const navigate = useNavigate()//initialise navigate

     const backToAdmin = () => {
       navigate('/admin-profile')
     } 
  
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
              <Link className="nav-link" to="/" style={{ transition: 'font-weight 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = 'bold'} onMouseLeave={(e) => e.currentTarget.style.fontWeight = 'normal'}>Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/talents" style={{ transition: 'font-weight 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = 'bold'} onMouseLeave={(e) => e.currentTarget.style.fontWeight = 'normal'}>Talents</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/coaches" style={{ transition: 'font-weight 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = 'bold'} onMouseLeave={(e) => e.currentTarget.style.fontWeight = 'normal'}>Coaches</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/scouts" style={{ transition: 'font-weight 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.fontWeight = 'bold'} onMouseLeave={(e) => e.currentTarget.style.fontWeight = 'normal'}>Scouts</Link>
            </li>
            
            {isLoggedIn && (
              <li className="nav-item px-3">
                <button className="btn btn-outline-danger" onClick={logout}>Log Out</button>
              </li>
            )}
             {isLoggedIn && isAdmin && (
              
              <li className="nav-item px-3">
                <button className="btn btn-primary" onClick={backToAdmin}>Admin</button>
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
        { !isLoggedIn && (
        <div className="d-flex">
          <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          {/* <Link to="/admin-landing-page" className="btn btn-dark">Admin</Link> */}
        </div>)
        }
      </div>
    </nav>
  );
};