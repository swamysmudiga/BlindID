import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import WelcomeScreen from './components/WelcomeScreen';
import Departments from './components/Departments';
import Subjects from './components/Subjects';
import Semisters from './components/Semisters';
import Courses from './components/Courses';
import StudentEnrollment from './components/admin/StudentEnrollment';
import MealPlans from './components/Mealplans';
import ParkingPlans from './components/Parkingplans';
import ParkingSlots from './components/ParkingSlots';
import Restaurants from './components/Restaurants';

import StudentsManagement from './components/students/StudentsManagement';
import Users from './components/users/Users';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to manage sidebar visibility
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const componentName = localStorage.getItem('selectedComponent');
    if (token) {
      setIsLoggedIn(true);
      setSelectedComponent(getComponent(componentName));
      setActiveItem(componentName);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const componentName = localStorage.getItem('selectedComponent') || 'WelcomeScreen';
    setSelectedComponent(getComponent(componentName));
    setActiveItem(componentName);
    localStorage.setItem('isLoggedIn', 'true');
   
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  const handleSidebarItemClick = (component, itemName) => {
    console.log(component.type.name);
     console.log(component);
    setSelectedComponent(component);
    setActiveItem(itemName);
    localStorage.setItem('selectedComponent', itemName);
    if (window.innerWidth < 768) {
      toggleSidebar(); // Automatically close sidebar on item click for small devices
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedComponent(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('selectedComponent');
    setIsSidebarVisible(true); // Reset sidebar visibility
  };

  const getComponent = (componentName) => {
    switch (componentName) {
      case 'Departments':
        return <Departments />;
      case 'StudentsManagement':
        return <StudentsManagement />;
      case 'Subjects':
        return <Subjects />;
      case 'Semisters':
        return <Semisters />;
      case 'Courses':
        return <Courses />;
      case 'StudentEnrollment':
        return <StudentEnrollment />;
      case 'MealPlans':
        return <MealPlans />;
      case 'ParkingPlans':
        return <ParkingPlans />; 
      case 'ParkingSlots':
        return <ParkingSlots />;  
     case 'Restaurants':
        return <Restaurants />;

      case 'Users':
        return <Users />;
      default:
        return <WelcomeScreen />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Router>
      <div className={`App ${isLoggedIn ? '' : 'without-sidebar'}`}>
        <header className="top-bar">
          {isLoggedIn && (
           
    
<button className="navbar-toggler toggle-sidebar-btn" onClick={toggleSidebar} type="button">
    <i className="fas fa-bars"></i> {/* Font Awesome icon */}
</button>


          )}
          <span className="heading">Student Enrollment System</span>
          {isLoggedIn && (
            <button className="btn btn-danger logout-btn float-right" onClick={handleLogout}>
              Logout
            </button>
          )}
        </header>

        {isLoggedIn && (
          <div className="container-fluid">
            <div className="row">
              <nav className={`col-md-2 d-md-block sidebar ${isSidebarVisible ? 'show' : ''}`}>
              <ul>
                  <li className={activeItem === 'Departments' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Departments />, 'Departments')}>Departments</li>
                  <li className={activeItem === 'Semisters' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Semisters />, 'Semisters')}>Semisters</li>
                  <li className={activeItem === 'Courses' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Courses />, 'Courses')}>Courses</li>
                  <li className={activeItem === 'Subjects' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Subjects />, 'Subjects')}>Subjects</li>
                  <li className={activeItem === 'StudentsManagement' ? 'active' : ''} onClick={() => handleSidebarItemClick(<StudentsManagement />, 'StudentsManagement')}>Students</li>
                  <li className={activeItem === 'StudentEnrollment' ? 'active' : ''} onClick={() => handleSidebarItemClick(<StudentEnrollment />, 'StudentEnrollment')}>Student Enrollment</li>
                  <li className={activeItem === 'MealPlans' ? 'active' : ''} onClick={() => handleSidebarItemClick(<MealPlans />, 'MealPlans')}>Meal Plans</li>
                  <li className={activeItem === 'Restaurants' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Restaurants />, 'Restaurants')}>Restaurants</li>
                  <li className={activeItem === 'ParkingPlans' ? 'active' : ''} onClick={() => handleSidebarItemClick(<ParkingPlans />, 'ParkingPlans')}>Parking Plans</li>
                  <li className={activeItem === 'ParkingSlots' ? 'active' : ''} onClick={() => handleSidebarItemClick(<ParkingSlots />, 'ParkingSlots')}>Parking Slots</li>

                  
                  <li className={activeItem === 'Users' ? 'active' : ''} onClick={() => handleSidebarItemClick(<Users />, 'Users')}>Users</li>
                  <li onClick={() => handleLogout()}>Logout</li>
                </ul>
              </nav>
              <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 main-content">
                {selectedComponent}
              </main>
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <main className="main-content">
            <Login onLogin={handleLogin} />
          </main>
        )}

        <footer className="footer">
          &copy; 2024 Student Enrollment System
        </footer>
      </div>
    </Router>
  );
};

export default App;
