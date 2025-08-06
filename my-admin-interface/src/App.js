import React from 'react';
import { User, BookOpen } from 'lucide-react';
import './App.css';

function App() {
  const handleDoctorClick = () => {
    // Open Doctor admin dashboard (will be running on port 5174)
    window.open('http://localhost:5174', '_self');
  };

  const handleTutorClick = () => {
    // Open Tutor admin dashboard (will be running on port 5176)
    window.open('http://localhost:5176', '_self');
  };

  return (
    <div className="app-container">
      <div className="admin-card">
        <div className="header">
          <h1>Admin Portal</h1>
          <p>Select your dashboard</p>
        </div>
        
        <div className="button-container">
          <button
            onClick={handleDoctorClick}
            className="admin-button doctor-button"
          >
            <User className="button-icon" />
            <span>Doctor Admin</span>
          </button>
          
          <button
            onClick={handleTutorClick}
            className="admin-button tutor-button"
          >
            <BookOpen className="button-icon" />
            <span>Tutor Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;