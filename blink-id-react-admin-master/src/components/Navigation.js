// Navigation.js
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';  

const Navigation = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user?.roles.map(role => role.name);
  const isAdminOrStaff = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_STAFF');
  const isAdminOrTeacher = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_TEACHER');
  const role_name =  localStorage.getItem("role_name") || "NA";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleNavLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container no-right-margin">
        <NavLink className="navbar-brand" to="/" onClick={handleNavLinkClick}>Blink-id admin panel</NavLink>
        <div className="ml-auto"> {/* Move this div to the right */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/" 
                onClick={handleNavLinkClick} 
               
              >
                Teachers
              </NavLink>
            </li>

         
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname === '/staff' ? 'active' : ''}`} 
                to="/staff" 
                onClick={handleNavLinkClick} 
               
              >
                Staff
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`} 
                to="/students" 
                onClick={handleNavLinkClick} 
               
              >
                Students
              </NavLink>
            </li>

            {isAdminOrTeacher && (
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname === '/exams' ? 'active' : ''}`} 
                to="/exams" 
                onClick={handleNavLinkClick} 
               
              >
                Exams
              </NavLink>
            </li>
            )}

            {isAdminOrStaff && (
            <li className="nav-item">
              <NavLink 
                className={`nav-link ${location.pathname === '/groups' ? 'active' : ''}`} 
                to="/groups" 
                onClick={handleNavLinkClick} 
               
              >
                Groups
              </NavLink>
            </li>
            )}


            {role_name === "ROLE_ADMIN" && (
              
              <li className="nav-item">
                <NavLink 
                  className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`} 
                  to="/users" 
                  onClick={handleNavLinkClick} 
                 
                >
                  Reset Password
                </NavLink>
              </li>
              
              )}

            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
     
    </nav>
    {localStorage.getItem("user") && (
      <div className="float-right mr-4">
  Logged in as <span style={{ color: 'purple', fontWeight: 'bold' }}>{JSON.parse(localStorage.getItem("user")).username}</span> 
</div>
)}
    </div>

    
  );
};

export default Navigation;
