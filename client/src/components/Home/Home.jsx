import React from 'react';
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

import './home.css';
import HomeImage from "../../assets/fitness-removebg-preview.png"

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        
        <div className="hero-image">
          <img src={HomeImage} alt="Fitness" />
        </div>
        <div className="hero-text" >
          <h1>REACH NEW HEIGHTS IN FITNESS</h1>
          <p>Join and transform your fitness today.</p>
          <Link to="/login" style={{ color: 'white', backgroundColor: '#000', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>
  START NOW
</Link>

        </div>
      </div>
      <div className="push-forward-section">
        <h2>PUSH YOUR HEALTH FORWARD</h2>
        <p>
          Embark your journey towards better health and vitality.
           Every step forward is a step towards a stronger, more vibrant you.
            Push your health forward and let your inner strength shine.
        </p>
        <div className="features">
          <div className="feature">
            <img src="https://i.pinimg.com/236x/f3/fb/9c/f3fb9c9757d5ca5da311afda4ec18cea.jpg" alt="Quality Equipment" />
            <p>Quality equipment</p>
          </div>
          <div className="feature">
            <img src="https://i.pinimg.com/236x/3d/73/53/3d735314b716845dfea8d9a9483c0107.jpg" alt="Nutritional Plan" />
            <p>Nutritional plan</p>
          </div>
          <div className="feature">
            <img src="https://i.pinimg.com/236x/cf/75/d2/cf75d2312ae3d498d26fd9282a127005.jpg" alt="Meditation Plan" />
            <p>Meditation Plan</p>
          </div>
        </div>
      </div>
      <div className="stats-section">
        <div className="stat">
          <h3>750+</h3>
          <p>Satisfied customers</p>
        </div>
        <div className="stat">
          <h3>690+</h3>
          <p>Good reviews</p>
        </div>
        <div className="stat">
          <h3>10+</h3>
          <p>Years of Experience</p>
        </div>
        <div className="stat">
          <h3>900+</h3>
          <p>Fitness plans</p>
        </div>
      </div>
    </div>
  );
};

export default Home;