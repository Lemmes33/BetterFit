import React from 'react';
import './navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="https://i.pinimg.com/564x/25/bf/13/25bf1306e6e49063586cd87d28fb5a4b.jpg" alt="BetterFit Logo" className="logo-image" />
        <div className="logo-text">BetterFit</div>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#workout">Workout Sessions</a></li>
        <li><a href="#diet">Healthy Diet</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#profile">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
