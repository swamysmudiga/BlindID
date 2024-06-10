import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Import SnackbarProvider and useSnackbar
import Login from './components/Login';
// import WelcomeScreen from './components/WelcomeScreen';
import Navigation from './components/Navigation';
// import NotFound from './components/NotFound';
import Students from './components/users/Students';
import Teachers from './components/users/Teachers';
import Staff from './components/users/Staff';
// import Admins from './components/users/Admins';
import Users from './components/users/Users';
import Exams from './components/Exams';
import ExamAdmins from './components/ExamAdmins'; 
import ExamStudents from './components/ExamStudents';
import GroupAdmins from './components/GroupAdmins'; 
import GroupStudents from './components/GroupStudents';
import Groups from './components/Groups';
// import { storage } from './firebase';
// import ImageUpload from './components/ImageUpload'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Use useSnackbar hook

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert token to boolean
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
    enqueueSnackbar('Logged out successfully!', { variant: 'success' }); // Corrected the message
    
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Navigation onLogout={handleLogout} />}
        <div className="main-content">
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Teachers />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/users" element={<Users />} />
                <Route path="/students" element={<Students />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/exams/:id/admins" element={<ExamAdmins />} />  
                <Route path="/exams/:id/students" element={<ExamStudents />} />  
                
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:id/admins" element={<GroupAdmins />} />  
                <Route path="/groups/:id/students" element={<GroupStudents />} />  

                {/* Removed the unnecessary wildcard route */}
              </>
            ) : (
              <>
                <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Adjusted the route path */}
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} /> {/* Moved the wildcard route outside the conditional rendering */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const AppWithSnackbar = () => (
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
);

export default AppWithSnackbar; // Export the wrapped component
