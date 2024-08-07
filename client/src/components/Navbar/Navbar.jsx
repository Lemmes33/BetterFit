import React from 'react';
import { Link } from 'react-router-dom'

import './navbar.css';
import Logo from '../../assets/logo.png'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="BetterFit Logo" className="logo-image" />
        <div className="logo-text">BetterFit</div>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#workout">Workout Sessions</a></li>
        <li><a href="#diet">Healthy Diet</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="/login">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
